"use client";

import type { ConversationStage, KanbanCardId, KanbanState } from "../conversations-types";
import { KANBAN_STAGES } from "./conversations-kanban-constants";
import { createCardLocationsById } from "./conversations-kanban-utils";

const CONVERSATIONS_KANBAN_STORAGE_KEY = "conversations-kanban-columns:v1";

// Keep local storage writes opportunistic so drag interactions stay responsive.
const PERSIST_IDLE_CALLBACK_TIMEOUT_MS = 500;
const PERSIST_FALLBACK_TIMEOUT_MS = 220;

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

function createStageCardIdRecord(): Record<ConversationStage, KanbanCardId[]> {
  return Object.fromEntries(
    KANBAN_STAGES.map((stage) => [stage, [] as KanbanCardId[]]),
  ) as Record<ConversationStage, KanbanCardId[]>;
}

export function resolveBoardStateFromPersistedColumns(
  baseState: KanbanState,
  persistedColumns: Partial<Record<ConversationStage, unknown>> | undefined,
): KanbanState {
  if (!persistedColumns || typeof persistedColumns !== "object") {
    return baseState;
  }

  const knownCardIds = new Set(Object.keys(baseState.cardsById) as KanbanCardId[]);
  const usedCardIds = new Set<KanbanCardId>();
  const columnCardIds = createStageCardIdRecord();

  for (const stage of KANBAN_STAGES) {
    const rawStageIds = persistedColumns[stage];
    if (!Array.isArray(rawStageIds)) {
      continue;
    }

    for (const rawCardId of rawStageIds) {
      if (typeof rawCardId !== "string") {
        continue;
      }

      const cardId = rawCardId as KanbanCardId;
      if (!knownCardIds.has(cardId) || usedCardIds.has(cardId)) {
        continue;
      }

      columnCardIds[stage].push(cardId);
      usedCardIds.add(cardId);
    }
  }

  for (const stage of KANBAN_STAGES) {
    for (const cardId of baseState.columnCardIds[stage]) {
      if (usedCardIds.has(cardId)) {
        continue;
      }

      columnCardIds[stage].push(cardId);
      usedCardIds.add(cardId);
    }
  }

  return {
    ...baseState,
    columnCardIds,
    cardLocationsById: createCardLocationsById(columnCardIds),
  };
}

export function readBoardStateFromLocalStorage(baseState: KanbanState): KanbanState {
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

export function persistBoardStateToLocalStorage(boardState: KanbanState) {
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

export function scheduleBoardStatePersist(task: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const idleWindow = window as IdleCallbackWindow;
  if (typeof idleWindow.requestIdleCallback === "function") {
    const idleCallbackId = idleWindow.requestIdleCallback(task, {
      timeout: PERSIST_IDLE_CALLBACK_TIMEOUT_MS,
    });

    return () => {
      idleWindow.cancelIdleCallback?.(idleCallbackId);
    };
  }

  const timeoutId = window.setTimeout(task, PERSIST_FALLBACK_TIMEOUT_MS);
  return () => {
    window.clearTimeout(timeoutId);
  };
}
