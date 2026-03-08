"use client";

import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import type {
  ConversationStage,
  KanbanCardId,
  KanbanDestination,
  KanbanDragState,
  KanbanPointer,
  KanbanState,
} from "../conversations-types";
import {
  DRAG_SCROLL_EDGE_THRESHOLD_PX,
  DRAG_SCROLL_MAX_STEP_PX,
  KANBAN_COLUMN_GAP_PX,
  KANBAN_COLUMN_WIDTH_PX,
  KANBAN_STAGES,
  SCROLL_EDGE_EPSILON_PX,
} from "./conversations-kanban-constants";
import {
  cloneKanbanState,
  findCardLocation,
  moveCardToDestination,
  parseCardDragId,
  resolveDestinationFromDragId,
  restoreFromSnapshot,
} from "./conversations-kanban-utils";

type SetBoardState = Dispatch<SetStateAction<KanbanState>>;
type ColumnListRefs = Record<ConversationStage, HTMLOListElement | null>;

function createEmptyColumnListRefs(): ColumnListRefs {
  return KANBAN_STAGES.reduce(
    (listRefsByStage, stage) => {
      listRefsByStage[stage] = null;
      return listRefsByStage;
    },
    {} as ColumnListRefs,
  );
}

function getPointerFromActivatorEvent(
  event: Event | null | undefined,
): KanbanPointer | null {
  if (!event) {
    return null;
  }

  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return { x: event.clientX, y: event.clientY };
  }

  if (typeof MouseEvent !== "undefined" && event instanceof MouseEvent) {
    return { x: event.clientX, y: event.clientY };
  }

  if (typeof TouchEvent !== "undefined" && event instanceof TouchEvent) {
    const touch = event.touches[0] ?? event.changedTouches[0];
    if (!touch) {
      return null;
    }

    return { x: touch.clientX, y: touch.clientY };
  }

  return null;
}

function isSameDestination(
  previous: KanbanDestination | null,
  next: KanbanDestination,
): boolean {
  return Boolean(
    previous &&
      previous.stage === next.stage &&
      previous.index === next.index,
  );
}

function computeDragOverBoardState(
  currentState: KanbanState,
  cardId: KanbanCardId,
  overId: UniqueIdentifier,
  previousDestination: KanbanDestination | null,
): {
  nextState: KanbanState;
  nextDestination: KanbanDestination | null;
} {
  const destination = resolveDestinationFromDragId(currentState, overId);
  if (!destination || isSameDestination(previousDestination, destination)) {
    return {
      nextState: currentState,
      nextDestination: previousDestination,
    };
  }

  return {
    nextState: moveCardToDestination(currentState, cardId, destination),
    nextDestination: destination,
  };
}

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

type UseKanbanScrollControlsOptions = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

export function useKanbanScrollControls({
  scrollContainerRef,
}: UseKanbanScrollControlsOptions) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const updateFrameRef = useRef<number | null>(null);
  const latestScrollStateRef = useRef({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const commitScrollState = useCallback(() => {
    const element = scrollContainerRef.current;
    if (!element) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = element;
    const nextState = {
      canScrollLeft: scrollLeft > SCROLL_EDGE_EPSILON_PX,
      canScrollRight:
        scrollLeft + clientWidth < scrollWidth - SCROLL_EDGE_EPSILON_PX,
    };

    if (nextState.canScrollLeft !== latestScrollStateRef.current.canScrollLeft) {
      setCanScrollLeft(nextState.canScrollLeft);
    }

    if (nextState.canScrollRight !== latestScrollStateRef.current.canScrollRight) {
      setCanScrollRight(nextState.canScrollRight);
    }

    latestScrollStateRef.current = nextState;
  }, [scrollContainerRef]);

  const updateScrollState = useCallback(() => {
    if (updateFrameRef.current !== null) {
      return;
    }

    updateFrameRef.current = window.requestAnimationFrame(() => {
      updateFrameRef.current = null;
      commitScrollState();
    });
  }, [commitScrollState]);

  const updateScrollStateNow = useCallback(() => {
    if (updateFrameRef.current !== null) {
      window.cancelAnimationFrame(updateFrameRef.current);
      updateFrameRef.current = null;
    }

    commitScrollState();
  }, [commitScrollState]);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) {
      return;
    }

    updateScrollStateNow();
    const handleResize = () => updateScrollState();

    element.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollContainerRef, updateScrollState, updateScrollStateNow]);

  useEffect(() => {
    return () => {
      if (updateFrameRef.current !== null) {
        window.cancelAnimationFrame(updateFrameRef.current);
      }
    };
  }, []);

  const scrollBoard = useCallback(
    (direction: "left" | "right") => {
      const element = scrollContainerRef.current;
      if (!element) return;

      const delta = KANBAN_COLUMN_WIDTH_PX + KANBAN_COLUMN_GAP_PX;
      element.scrollBy({
        left: direction === "right" ? delta : -delta,
        behavior: "smooth",
      });
    },
    [scrollContainerRef],
  );

  return {
    canScrollLeft,
    canScrollRight,
    scrollBoard,
    updateScrollState,
  };
}

type UseKanbanDragStateOptions = {
  boardState: KanbanState;
  setBoardState: SetBoardState;
  onBoardCommit?: (nextBoardState: KanbanState) => void;
};

export function useKanbanDragState({
  boardState,
  setBoardState,
  onBoardCommit,
}: UseKanbanDragStateOptions) {
  const [activeDrag, setActiveDrag] = useState<KanbanDragState | null>(null);
  const columnListRefsRef = useRef(createEmptyColumnListRefs());
  const dragSnapshotRef = useRef<KanbanState | null>(null);
  const dragDestinationRef = useRef<KanbanDestination | null>(null);
  const dragStartPointerRef = useRef<KanbanPointer | null>(null);
  const pointerRef = useRef<KanbanPointer | null>(null);
  const pendingDragOverRef = useRef<{
    cardId: KanbanCardId;
    overId: UniqueIdentifier;
  } | null>(null);
  const dragOverFrameRef = useRef<number | null>(null);

  const commitBoardState = useCallback(
    (nextBoardState: KanbanState): KanbanState => {
      onBoardCommit?.(nextBoardState);
      return nextBoardState;
    },
    [onBoardCommit],
  );

  const clearScheduledDragOver = useCallback(() => {
    pendingDragOverRef.current = null;

    if (dragOverFrameRef.current !== null) {
      window.cancelAnimationFrame(dragOverFrameRef.current);
      dragOverFrameRef.current = null;
    }
  }, []);

  const clearDragState = useCallback(() => {
    clearScheduledDragOver();
    setActiveDrag(null);
    dragSnapshotRef.current = null;
    dragDestinationRef.current = null;
    dragStartPointerRef.current = null;
    pointerRef.current = null;
  }, [clearScheduledDragOver]);

  const restoreDragSnapshot = useCallback(() => {
    setBoardState((currentState) =>
      commitBoardState(restoreFromSnapshot(dragSnapshotRef.current, currentState)),
    );
  }, [commitBoardState, setBoardState]);

  const flushPendingDragOver = useCallback(() => {
    dragOverFrameRef.current = null;

    const pendingDragOver = pendingDragOverRef.current;
    pendingDragOverRef.current = null;
    if (!pendingDragOver) {
      return;
    }

    setBoardState((currentState) => {
      const { nextState, nextDestination } = computeDragOverBoardState(
        currentState,
        pendingDragOver.cardId,
        pendingDragOver.overId,
        dragDestinationRef.current,
      );

      dragDestinationRef.current = nextDestination;
      return nextState;
    });
  }, [setBoardState]);

  const scheduleDragOverUpdate = useCallback(() => {
    if (dragOverFrameRef.current !== null) {
      return;
    }

    dragOverFrameRef.current = window.requestAnimationFrame(() => {
      flushPendingDragOver();
    });
  }, [flushPendingDragOver]);

  const handleDragStart = useCallback(
    ({ active, activatorEvent }: DragStartEvent) => {
      const cardId = parseCardDragId(active.id);
      if (!cardId) {
        return;
      }

      const currentLocation = findCardLocation(boardState, cardId);
      if (!currentLocation) {
        return;
      }

      dragSnapshotRef.current = cloneKanbanState(boardState);
      dragDestinationRef.current = currentLocation;

      const pointer = getPointerFromActivatorEvent(activatorEvent);
      dragStartPointerRef.current = pointer;
      pointerRef.current = pointer;

      setActiveDrag({
        cardId,
        originStage: currentLocation.stage,
        originIndex: currentLocation.index,
      });
    },
    [boardState],
  );

  const handleDragMove = useCallback(({ delta }: DragMoveEvent) => {
    const startPointer = dragStartPointerRef.current;
    if (!startPointer) {
      return;
    }

    pointerRef.current = {
      x: startPointer.x + delta.x,
      y: startPointer.y + delta.y,
    };
  }, []);

  const handleDragOver = useCallback(
    ({ active, over }: DragOverEvent) => {
      if (!over) {
        return;
      }

      const cardId = parseCardDragId(active.id);
      if (!cardId) {
        return;
      }

      pendingDragOverRef.current = {
        cardId,
        overId: over.id,
      };
      scheduleDragOverUpdate();
    },
    [scheduleDragOverUpdate],
  );

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      clearScheduledDragOver();

      const cardId = parseCardDragId(active.id);
      if (!cardId) {
        clearDragState();
        return;
      }

      if (!over) {
        restoreDragSnapshot();
        clearDragState();
        return;
      }

      setBoardState((currentState) => {
        const destination =
          resolveDestinationFromDragId(currentState, over.id) ??
          dragDestinationRef.current;
        const nextState = destination
          ? moveCardToDestination(currentState, cardId, destination)
          : restoreFromSnapshot(dragSnapshotRef.current, currentState);

        return commitBoardState(nextState);
      });

      clearDragState();
    },
    [
      clearDragState,
      clearScheduledDragOver,
      commitBoardState,
      restoreDragSnapshot,
      setBoardState,
    ],
  );

  const handleDragCancel = useCallback(() => {
    restoreDragSnapshot();
    clearDragState();
  }, [clearDragState, restoreDragSnapshot]);

  useEffect(() => clearScheduledDragOver, [clearScheduledDragOver]);

  return {
    activeDrag,
    pointerRef,
    dragDestinationRef,
    columnListRefsRef,
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
}

type UseKanbanAutoScrollOptions = {
  activeDrag: KanbanDragState | null;
  pointerRef: RefObject<KanbanPointer | null>;
  dragDestinationRef: RefObject<KanbanDestination | null>;
  columnListRefsRef: RefObject<ColumnListRefs>;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  updateScrollState: () => void;
};

export function useKanbanAutoScroll({
  activeDrag,
  pointerRef,
  dragDestinationRef,
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
      const pointer = pointerRef.current;
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
          dragDestinationRef.current?.stage ?? activeDrag.originStage;
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
    dragDestinationRef,
    pointerRef,
    scrollContainerRef,
    updateScrollState,
  ]);
}
