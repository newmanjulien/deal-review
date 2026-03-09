"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { conversationsData } from "./conversations-data";
import type { ConversationRow, KanbanState } from "./conversations-types";
import { KANBAN_STAGES } from "./kanban/conversations-kanban-constants";
import {
  persistBoardStateToLocalStorage,
  readBoardStateFromLocalStorage,
  scheduleBoardStatePersist,
} from "./kanban/conversations-kanban-persistence";
import { createKanbanState } from "./kanban/conversations-kanban-utils";

// Defer hydration so the first client paint can use the static seed state.
const BOARD_STATE_HYDRATION_DELAY_MS = 0;

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
  const [boardState, setBoardState] = useState<KanbanState>(() =>
    createKanbanState(conversationsData.views.rows),
  );
  const latestBoardStateRef = useRef(boardState);

  useEffect(() => {
    latestBoardStateRef.current = boardState;
  }, [boardState]);

  const persistBoardStateNow = useCallback((state?: KanbanState) => {
    persistBoardStateToLocalStorage(state ?? latestBoardStateRef.current);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setBoardState(
        readBoardStateFromLocalStorage(createKanbanState(conversationsData.views.rows)),
      );
    }, BOARD_STATE_HYDRATION_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    return scheduleBoardStatePersist(() => {
      persistBoardStateNow(boardState);
    });
  }, [boardState, persistBoardStateNow]);

  useEffect(() => {
    const flushBoardState = () => {
      persistBoardStateNow();
    };

    const handleVisibilityChange = () =>
      document.visibilityState === "hidden" && flushBoardState();

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
