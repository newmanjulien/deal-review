"use client";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  type DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type {
  ConversationStage,
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
  KANBAN_DROP_ANIMATION_DURATION_MS,
  KANBAN_OVERLAY_Z_INDEX,
  KANBAN_STAGES,
  SCROLL_EDGE_EPSILON_PX,
} from "./conversations-kanban-constants";
import { ConversationsKanbanChrome } from "./conversations-kanban-chrome";
import { ConversationsKanbanDragOverlayCard } from "./conversations-kanban-card";
import { ConversationsKanbanColumn } from "./conversations-kanban-column";
import {
  cloneKanbanState,
  findCardLocation,
  moveCardToDestination,
  parseCardDragId,
  resolveDestinationFromDragId,
  restoreFromSnapshot,
} from "./conversations-kanban-utils";

type ConversationsKanbanProps = {
  boardState: KanbanState;
  setBoardState: Dispatch<SetStateAction<KanbanState>>;
};

function createEmptyColumnListRefs(): Record<
  ConversationStage,
  HTMLOListElement | null
> {
  return {
    Discovery: null,
    Proposal: null,
    Negotiation: null,
    "Closed won": null,
    "Closed lost": null,
  };
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

function getEdgeScrollVelocity(
  pointer: number,
  min: number,
  max: number,
): number {
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

export function ConversationsKanban({
  boardState,
  setBoardState,
}: ConversationsKanbanProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const columnListRefsRef = useRef(createEmptyColumnListRefs());
  const dragSnapshotRef = useRef<KanbanState | null>(null);
  const dragDestinationRef = useRef<KanbanDestination | null>(null);
  const dragStartPointerRef = useRef<KanbanPointer | null>(null);
  const pointerRef = useRef<KanbanPointer | null>(null);

  const [activeDrag, setActiveDrag] = useState<KanbanDragState | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const updateScrollState = useCallback(() => {
    const element = scrollContainerRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;
    setCanScrollLeft(scrollLeft > SCROLL_EDGE_EPSILON_PX);
    setCanScrollRight(
      scrollLeft + clientWidth < scrollWidth - SCROLL_EDGE_EPSILON_PX,
    );
  }, []);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) return;

    updateScrollState();
    const handleResize = () => updateScrollState();

    element.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScrollState]);

  const scrollBoard = (direction: "left" | "right") => {
    const element = scrollContainerRef.current;
    if (!element) return;

    const delta = KANBAN_COLUMN_WIDTH_PX + KANBAN_COLUMN_GAP_PX;
    element.scrollBy({
      left: direction === "right" ? delta : -delta,
      behavior: "smooth",
    });
  };

  const clearDragState = useCallback(() => {
    setActiveDrag(null);
    dragSnapshotRef.current = null;
    dragDestinationRef.current = null;
    dragStartPointerRef.current = null;
    pointerRef.current = null;
  }, []);

  const restoreDragSnapshot = useCallback(() => {
    setBoardState((currentState) =>
      restoreFromSnapshot(dragSnapshotRef.current, currentState),
    );
  }, [setBoardState]);

  const handleDragStart = ({ active, activatorEvent }: DragStartEvent) => {
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
  };

  const handleDragMove = ({ delta }: DragMoveEvent) => {
    const startPointer = dragStartPointerRef.current;
    if (!startPointer) {
      return;
    }

    pointerRef.current = {
      x: startPointer.x + delta.x,
      y: startPointer.y + delta.y,
    };
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) {
      return;
    }

    const cardId = parseCardDragId(active.id);
    if (!cardId) {
      return;
    }

    setBoardState((currentState) => {
      const destination = resolveDestinationFromDragId(currentState, over.id);
      if (!destination) {
        return currentState;
      }

      const previousDestination = dragDestinationRef.current;
      if (
        previousDestination &&
        previousDestination.stage === destination.stage &&
        previousDestination.index === destination.index
      ) {
        return currentState;
      }

      dragDestinationRef.current = destination;
      return moveCardToDestination(currentState, cardId, destination);
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
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

    const destination =
      resolveDestinationFromDragId(boardState, over.id) ??
      dragDestinationRef.current;
    if (!destination) {
      restoreDragSnapshot();
      clearDragState();
      return;
    }

    setBoardState((currentState) =>
      moveCardToDestination(currentState, cardId, destination),
    );

    clearDragState();
  };

  const handleDragCancel = () => {
    restoreDragSnapshot();
    clearDragState();
  };

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
        const columnListElement =
          columnListRefsRef.current[verticalScrollStage];

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
  }, [activeDrag, updateScrollState]);

  const handleColumnListRefChange = useCallback(
    (stage: ConversationStage, element: HTMLOListElement | null) => {
      columnListRefsRef.current[stage] = element;
    },
    [],
  );

  const activeDragRow = activeDrag
    ? boardState.cardsById[activeDrag.cardId]
    : null;
  const canUsePortal = typeof document !== "undefined";

  return (
    <DndContext
      sensors={sensors}
      autoScroll={false}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <ConversationsKanbanChrome
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onScrollLeft={() => scrollBoard("left")}
        onScrollRight={() => scrollBoard("right")}
      >
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            className="grid min-h-[clamp(38rem,72dvh,56rem)] min-w-max grid-flow-col gap-3"
            style={{ gridAutoColumns: KANBAN_COLUMN_WIDTH_PX }}
          >
            {KANBAN_STAGES.map((stage) => (
              <ConversationsKanbanColumn
                key={stage}
                stage={stage}
                cardIds={boardState.columnCardIds[stage]}
                cardsById={boardState.cardsById}
                activeDragCardId={activeDrag?.cardId ?? null}
                onColumnListRefChange={handleColumnListRefChange}
              />
            ))}
          </div>
        </div>
      </ConversationsKanbanChrome>

      {canUsePortal
        ? createPortal(
            <DragOverlay
              zIndex={KANBAN_OVERLAY_Z_INDEX}
              dropAnimation={{
                duration: KANBAN_DROP_ANIMATION_DURATION_MS,
                easing: "ease",
              }}
            >
              {activeDragRow ? (
                <ConversationsKanbanDragOverlayCard row={activeDragRow} />
              ) : null}
            </DragOverlay>,
            document.body,
          )
        : null}
    </DndContext>
  );
}
