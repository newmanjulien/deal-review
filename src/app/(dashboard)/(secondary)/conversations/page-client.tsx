"use client";

import { useMemo, useState } from "react";
import { CanvasWidePage } from "@/components/canvas/canvas-page";
import { CONVERSATIONS_PAGE_CONFIG } from "./conversations-config";
import { conversationSellerPeople } from "./conversations-data";
import { ConversationsKanban } from "./kanban/conversations-kanban";
import { ConversationsSellerFilterMenu } from "./conversations-seller-filter-menu";
import { ConversationsTable } from "./conversations-table";
import { useMediaQuery } from "@/lib/use-media-query";
import {
  buildRowsFromBoardState,
  useConversationsBoardState,
} from "./use-conversations-board-state";

type ConversationView = "table" | "kanban";

export function ConversationsPageClient() {
  const [activeDesktopView, setActiveDesktopView] =
    useState<ConversationView>("kanban");
  const { boardState, setBoardState, persistBoardStateNow } =
    useConversationsBoardState();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const effectiveView: ConversationView = isDesktop ? activeDesktopView : "table";
  const tableRows = useMemo(
    () =>
      effectiveView === "table" ? buildRowsFromBoardState(boardState) : null,
    [boardState, effectiveView],
  );

  return (
    <CanvasWidePage
      title={CONVERSATIONS_PAGE_CONFIG.title}
      description={CONVERSATIONS_PAGE_CONFIG.description}
    >
      <section className="space-y-4">
        {isDesktop ? (
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-zinc-100">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setActiveDesktopView("kanban")}
                className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
                  activeDesktopView === "kanban" ? "text-zinc-900" : "text-zinc-500"
                }`}
              >
                Kanban
                {activeDesktopView === "kanban" ? (
                  <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => setActiveDesktopView("table")}
                className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
                  activeDesktopView === "table" ? "text-zinc-900" : "text-zinc-500"
                }`}
              >
                Table
                {activeDesktopView === "table" ? (
                  <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
                ) : null}
              </button>
            </div>

            <div className="flex items-center gap-2 pb-3">
              <ConversationsSellerFilterMenu people={conversationSellerPeople} />
            </div>
          </div>
        ) : null}

        {effectiveView === "table" ? (
          <ConversationsTable rows={tableRows ?? []} />
        ) : (
          <ConversationsKanban
            boardState={boardState}
            setBoardState={setBoardState}
            onBoardCommit={persistBoardStateNow}
          />
        )}
      </section>
    </CanvasWidePage>
  );
}
