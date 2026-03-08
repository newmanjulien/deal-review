"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { conversationRows } from "./conversations-data";
import type {
  ConversationRow,
  ConversationStage,
  KanbanState,
} from "./conversations-types";
import { KANBAN_STAGES } from "./kanban/conversations-kanban-constants";
import {
  createCardLocationsById,
  createKanbanState,
} from "./kanban/conversations-kanban-utils";

const CONVERSATIONS_KANBAN_STORAGE_KEY = "conversations-kanban-columns:v1";

type PersistedConversationsKanbanColumns = {
  columnCardIds?: Partial<Record<ConversationStage, unknown>>;
};

type IdleCallbackWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: () => void,
      options?: { timeout: number },
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

function createDefaultBoardState(): KanbanState {
  return createKanbanState(conversationRows);
}

function sanitizeStageCardIds(
  rawStageIds: unknown,
  knownCardIds: Set<string>,
  seenCardIds: Set<string>,
): string[] {
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

  return filteredStageIds;
}

function appendMissingBaseCards(
  nextColumnCardIds: Record<ConversationStage, string[]>,
  baseState: KanbanState,
  seenCardIds: Set<string>,
) {
  for (const stage of KANBAN_STAGES) {
    for (const cardId of baseState.columnCardIds[stage]) {
      if (seenCardIds.has(cardId)) {
        continue;
      }

      nextColumnCardIds[stage].push(cardId);
      seenCardIds.add(cardId);
    }
  }
}

function resolveBoardStateFromPersistedColumns(
  baseState: KanbanState,
  persistedColumns: Partial<Record<ConversationStage, unknown>> | undefined,
): KanbanState {
  if (!persistedColumns || typeof persistedColumns !== "object") {
    return baseState;
  }

  const knownCardIds = new Set(Object.keys(baseState.cardsById));
  const seenCardIds = new Set<string>();
  const nextColumnCardIds = {} as Record<ConversationStage, string[]>;

  for (const stage of KANBAN_STAGES) {
    nextColumnCardIds[stage] = sanitizeStageCardIds(
      persistedColumns[stage],
      knownCardIds,
      seenCardIds,
    );
  }

  appendMissingBaseCards(nextColumnCardIds, baseState, seenCardIds);

  return {
    ...baseState,
    columnCardIds: nextColumnCardIds,
    cardLocationsById: createCardLocationsById(nextColumnCardIds),
  };
}

function readBoardStateFromLocalStorage(baseState: KanbanState): KanbanState {
  if (typeof window === "undefined") {
    return baseState;
  }

  try {
    const raw = window.localStorage.getItem(CONVERSATIONS_KANBAN_STORAGE_KEY);
    if (!raw) {
      return baseState;
    }

    const parsed = JSON.parse(raw) as PersistedConversationsKanbanColumns;
    return resolveBoardStateFromPersistedColumns(baseState, parsed.columnCardIds);
  } catch {
    return baseState;
  }
}

function persistBoardState(boardState: KanbanState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    CONVERSATIONS_KANBAN_STORAGE_KEY,
    JSON.stringify({
      columnCardIds: boardState.columnCardIds,
    }),
  );
}

function scheduleIdleTask(task: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const idleWindow = window as IdleCallbackWindow;
  if (typeof idleWindow.requestIdleCallback === "function") {
    const idleCallbackId = idleWindow.requestIdleCallback(task, {
      timeout: 500,
    });

    return () => {
      idleWindow.cancelIdleCallback?.(idleCallbackId);
    };
  }

  const timeoutId = window.setTimeout(task, 220);
  return () => {
    window.clearTimeout(timeoutId);
  };
}

export function buildRowsFromBoardState(boardState: KanbanState): ConversationRow[] {
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

export function useConversationsBoardState() {
  const [boardState, setBoardState] = useState<KanbanState>(createDefaultBoardState);
  const latestBoardStateRef = useRef(boardState);

  useEffect(() => {
    latestBoardStateRef.current = boardState;
  }, [boardState]);

  const persistBoardStateNow = useCallback((state?: KanbanState) => {
    persistBoardState(state ?? latestBoardStateRef.current);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setBoardState(readBoardStateFromLocalStorage(createDefaultBoardState()));
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    return scheduleIdleTask(() => {
      persistBoardStateNow(boardState);
    });
  }, [boardState, persistBoardStateNow]);

  useEffect(() => {
    const flushBoardState = () => {
      persistBoardStateNow();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushBoardState();
      }
    };

    window.addEventListener("pagehide", flushBoardState);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pagehide", flushBoardState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [persistBoardStateNow]);

  return {
    boardState,
    setBoardState,
    persistBoardStateNow,
  };
}
