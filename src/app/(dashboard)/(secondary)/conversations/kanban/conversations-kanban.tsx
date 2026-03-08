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
import {
  useCallback,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import type {
  ConversationStage,
  KanbanState,
} from "../conversations-types";
import {
  KANBAN_COLUMN_WIDTH_PX,
  KANBAN_DROP_ANIMATION_DURATION_MS,
  KANBAN_OVERLAY_Z_INDEX,
  KANBAN_STAGES,
} from "./conversations-kanban-constants";
import { ConversationsKanbanChrome } from "./conversations-kanban-chrome";
import { ConversationsKanbanDragOverlayCard } from "./conversations-kanban-card";
import { ConversationsKanbanColumn } from "./conversations-kanban-column";
import {
  useKanbanAutoScroll,
  useKanbanDragState,
  useKanbanScrollControls,
} from "./conversations-kanban-hooks";

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
  const { canScrollLeft, canScrollRight, scrollBoard, updateScrollState } =
    useKanbanScrollControls({
      scrollContainerRef,
    });
  const {
    activeDrag,
    pointerRef,
    dragDestinationRef,
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
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useKanbanAutoScroll({
    activeDrag,
    pointerRef,
    dragDestinationRef,
    columnListRefsRef,
    scrollContainerRef,
    updateScrollState,
  });

  const handleColumnListRefChange = useCallback(
    (stage: ConversationStage, element: HTMLOListElement | null) => {
      columnListRefsRef.current[stage] = element;
    },
    [columnListRefsRef],
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
