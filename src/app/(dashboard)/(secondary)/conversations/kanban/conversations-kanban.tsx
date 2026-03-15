"use client";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useRef, type Dispatch, type SetStateAction } from "react";
import type { KanbanState } from "../conversations-types";
import {
  KANBAN_DRAG_ACTIVATION_DISTANCE_PX,
  KANBAN_COLUMN_WIDTH_PX,
  KANBAN_DROP_ANIMATION_DURATION_MS,
  KANBAN_OVERLAY_Z_INDEX,
  KANBAN_STAGES,
} from "./conversations-kanban-constants";
import { ConversationsKanbanChrome } from "./conversations-kanban-chrome";
import { ConversationsKanbanDragOverlayCard } from "./conversations-kanban-card";
import { ConversationsKanbanColumn } from "./conversations-kanban-column";
import { useKanbanAutoScroll } from "./use-kanban-auto-scroll";
import { useKanbanDragState } from "./use-kanban-drag-state";
import { useKanbanScrollControls } from "./use-kanban-scroll-controls";

type ConversationsKanbanProps = {
  boardState: KanbanState;
  setBoardState: Dispatch<SetStateAction<KanbanState>>;
  onBoardCommit?: (nextBoardState: KanbanState) => void;
};

export function ConversationsKanban({
  boardState,
  setBoardState,
  onBoardCommit,
}: ConversationsKanbanProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { canScrollLeft, canScrollRight, updateScrollState } =
    useKanbanScrollControls({
      scrollContainerRef,
    });
  const {
    activeDrag,
    dragSessionRef,
    columnListRefsRef,
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useKanbanDragState({
    boardState,
    setBoardState,
    onBoardCommit,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: KANBAN_DRAG_ACTIVATION_DISTANCE_PX,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useKanbanAutoScroll({
    activeDrag,
    dragSessionRef,
    columnListRefsRef,
    scrollContainerRef,
    updateScrollState,
  });

  const activeDragRow = activeDrag && boardState.cardsById[activeDrag.cardId];
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
      >
        <div
          ref={scrollContainerRef}
          className="h-full min-h-0 overflow-x-auto overflow-y-hidden pb-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            className="grid h-full min-w-max grid-flow-col gap-3"
            style={{ gridAutoColumns: KANBAN_COLUMN_WIDTH_PX }}
          >
            {KANBAN_STAGES.map((stage) => (
              <ConversationsKanbanColumn
                key={stage}
                stage={stage}
                cardIds={boardState.columnCardIds[stage]}
                cardsById={boardState.cardsById}
                activeDragCardId={activeDrag?.cardId ?? null}
                onColumnListRefChange={(columnStage, element) => {
                  columnListRefsRef.current[columnStage] = element;
                }}
              />
            ))}
          </div>
        </div>
      </ConversationsKanbanChrome>

      {canUsePortal &&
        createPortal(
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
        )}
    </DndContext>
  );
}
