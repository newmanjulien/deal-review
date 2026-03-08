"use client";

import { useEffect, type RefObject } from "react";
import type { KanbanDragState } from "../conversations-types";
import {
  DRAG_SCROLL_EDGE_THRESHOLD_PX,
  DRAG_SCROLL_MAX_STEP_PX,
} from "./conversations-kanban-constants";
import type {
  ColumnListRefs,
  KanbanDragSessionRuntime,
} from "./use-kanban-drag-state";

type UseKanbanAutoScrollOptions = {
  activeDrag: KanbanDragState | null;
  dragSessionRef: RefObject<KanbanDragSessionRuntime>;
  columnListRefsRef: RefObject<ColumnListRefs>;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  updateScrollState: () => void;
};

function getEdgeScrollVelocity(pointer: number, min: number, max: number): number {
  const minEdge = min + DRAG_SCROLL_EDGE_THRESHOLD_PX;
  const maxEdge = max - DRAG_SCROLL_EDGE_THRESHOLD_PX;

  if (pointer < minEdge) {
    const distance = minEdge - pointer;
    return -Math.min(
      DRAG_SCROLL_MAX_STEP_PX,
      (distance / DRAG_SCROLL_EDGE_THRESHOLD_PX) * DRAG_SCROLL_MAX_STEP_PX,
    );
  }

  if (pointer > maxEdge) {
    const distance = pointer - maxEdge;
    return Math.min(
      DRAG_SCROLL_MAX_STEP_PX,
      (distance / DRAG_SCROLL_EDGE_THRESHOLD_PX) * DRAG_SCROLL_MAX_STEP_PX,
    );
  }

  return 0;
}

export function useKanbanAutoScroll({
  activeDrag,
  dragSessionRef,
  columnListRefsRef,
  scrollContainerRef,
  updateScrollState,
}: UseKanbanAutoScrollOptions) {
  useEffect(() => {
    if (!activeDrag) {
      return;
    }

    let rafId = 0;

    const tick = () => {
      const pointer = dragSessionRef.current.pointer;
      if (pointer) {
        const boardElement = scrollContainerRef.current;
        if (boardElement) {
          const boardRect = boardElement.getBoundingClientRect();
          const xVelocity = getEdgeScrollVelocity(
            pointer.x,
            boardRect.left,
            boardRect.right,
          );

          if (xVelocity !== 0) {
            boardElement.scrollLeft += xVelocity;
            updateScrollState();
          }
        }

        const verticalScrollStage =
          dragSessionRef.current.destination?.stage ?? activeDrag.originStage;
        const columnListElement = columnListRefsRef.current[verticalScrollStage];
        if (columnListElement) {
          const columnRect = columnListElement.getBoundingClientRect();
          const yVelocity = getEdgeScrollVelocity(
            pointer.y,
            columnRect.top,
            columnRect.bottom,
          );

          if (yVelocity !== 0) {
            columnListElement.scrollTop += yVelocity;
          }
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [
    activeDrag,
    columnListRefsRef,
    dragSessionRef,
    scrollContainerRef,
    updateScrollState,
  ]);
}
