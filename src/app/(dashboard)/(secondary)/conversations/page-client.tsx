"use client";

import { useEffect, useMemo, useState } from "react";
import { CanvasWidePage } from "@/components/canvas/canvas-page";
import { CONVERSATIONS_PAGE_CONFIG } from "./conversations-config";
import { conversationRows, conversationSellerPeople } from "./conversations-data";
import type {
  ConversationRow,
  ConversationStage,
  KanbanState,
} from "./conversations-types";
import { ConversationsKanban } from "./kanban/conversations-kanban";
import { KANBAN_STAGES } from "./kanban/conversations-kanban-constants";
import { createKanbanState } from "./kanban/conversations-kanban-utils";
import { ConversationsSellerFilterMenu } from "./conversations-seller-filter-menu";
import { ConversationsTable } from "./conversations-table";

type ConversationView = "table" | "kanban";

const CONVERSATIONS_KANBAN_STORAGE_KEY = "conversations-kanban-columns:v1";

type PersistedConversationsKanbanColumns = {
  columnCardIds?: Partial<Record<ConversationStage, unknown>>;
};

function createInitialBoardState(): KanbanState {
  const baseState = createKanbanState(conversationRows);

  if (typeof window === "undefined") {
    return baseState;
  }

  try {
    const raw = window.localStorage.getItem(CONVERSATIONS_KANBAN_STORAGE_KEY);
    if (!raw) {
      return baseState;
    }

    const parsed = JSON.parse(raw) as PersistedConversationsKanbanColumns;
    const persistedColumns = parsed.columnCardIds;

    if (!persistedColumns || typeof persistedColumns !== "object") {
      return baseState;
    }

    const knownCardIds = new Set(Object.keys(baseState.cardsById));
    const seenCardIds = new Set<string>();
    const nextColumnCardIds = {} as Record<ConversationStage, string[]>;

    for (const stage of KANBAN_STAGES) {
      const rawStageIds = persistedColumns[stage];
      const stageIds = Array.isArray(rawStageIds) ? rawStageIds : [];
      const filteredStageIds: string[] = [];

      for (const rawCardId of stageIds) {
        if (typeof rawCardId !== "string") {
          continue;
        }

        if (!knownCardIds.has(rawCardId) || seenCardIds.has(rawCardId)) {
          continue;
        }

        filteredStageIds.push(rawCardId);
        seenCardIds.add(rawCardId);
      }

      nextColumnCardIds[stage] = filteredStageIds;
    }

    for (const stage of KANBAN_STAGES) {
      for (const cardId of baseState.columnCardIds[stage]) {
        if (seenCardIds.has(cardId)) {
          continue;
        }

        nextColumnCardIds[stage].push(cardId);
        seenCardIds.add(cardId);
      }
    }

    return {
      ...baseState,
      columnCardIds: nextColumnCardIds,
    };
  } catch {
    return baseState;
  }
}

function buildRowsFromBoardState(boardState: KanbanState): ConversationRow[] {
  const rows: ConversationRow[] = [];

  for (const stage of KANBAN_STAGES) {
    for (const cardId of boardState.columnCardIds[stage]) {
      const row = boardState.cardsById[cardId];

      if (!row) {
        continue;
      }

      rows.push(row.stage === stage ? row : { ...row, stage });
    }
  }

  return rows;
}

export function ConversationsPageClient() {
  const [activeView, setActiveView] = useState<ConversationView>("kanban");
  const [boardState, setBoardState] = useState<KanbanState>(createInitialBoardState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      window.localStorage.setItem(
        CONVERSATIONS_KANBAN_STORAGE_KEY,
        JSON.stringify({
          columnCardIds: boardState.columnCardIds,
        }),
      );
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [boardState.columnCardIds]);

  const tableRows = useMemo(
    () => buildRowsFromBoardState(boardState),
    [boardState],
  );

  return (
    <CanvasWidePage
      title={CONVERSATIONS_PAGE_CONFIG.title}
      description={CONVERSATIONS_PAGE_CONFIG.description}
    >
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-zinc-100">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveView("kanban")}
              className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
                activeView === "kanban" ? "text-zinc-900" : "text-zinc-500"
              }`}
            >
              Kanban
              {activeView === "kanban" ? (
                <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setActiveView("table")}
              className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
                activeView === "table" ? "text-zinc-900" : "text-zinc-500"
              }`}
            >
              Table
              {activeView === "table" ? (
                <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
              ) : null}
            </button>
          </div>

          <div className="flex items-center gap-2 pb-3">
            <ConversationsSellerFilterMenu people={conversationSellerPeople} />
          </div>
        </div>

        {activeView === "table" ? (
          <ConversationsTable rows={tableRows} />
        ) : (
          <ConversationsKanban
            boardState={boardState}
            setBoardState={setBoardState}
          />
        )}
      </section>
    </CanvasWidePage>
  );
}
