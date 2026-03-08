"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Grip } from "lucide-react";
import { useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ConversationsKanbanSortableCard } from "./conversations-kanban-card";
import { createCardDragId, createColumnDragId } from "./conversations-kanban-utils";
import type { KanbanCardId, KanbanState } from "./conversations-kanban-types";
import type { ConversationStage } from "../conversations-types";

type ConversationsKanbanColumnProps = {
  stage: ConversationStage;
  cardIds: KanbanCardId[];
  cardsById: KanbanState["cardsById"];
  activeDragCardId: KanbanCardId | null;
  onColumnListRefChange: (
    stage: ConversationStage,
    element: HTMLOListElement | null,
  ) => void;
};

export function ConversationsKanbanColumn({
  stage,
  cardIds,
  cardsById,
  activeDragCardId,
  onColumnListRefChange,
}: ConversationsKanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: createColumnDragId(stage),
    data: {
      stage,
    },
  });

  const sortableItems = useMemo(
    () => cardIds.map((cardId) => createCardDragId(cardId)),
    [cardIds],
  );

  const handleListRefChange = useCallback(
    (element: HTMLOListElement | null) => {
      onColumnListRefChange(stage, element);
    },
    [onColumnListRefChange, stage],
  );

  return (
    <section
      ref={setNodeRef}
      className={cn(
        "flex h-[38rem] w-[17rem] snap-start flex-col rounded-md border border-zinc-200/80 bg-zinc-50/60 p-2.5 transition-colors",
        isOver && "border-zinc-300 bg-zinc-100/60",
      )}
    >
      <header className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Grip className="size-3 text-zinc-300" />
          <h2 className="text-xs font-medium tracking-wide text-zinc-600">{stage}</h2>
        </div>
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-zinc-200/80 px-1.5 text-xs font-medium tracking-wide text-zinc-600">
          {cardIds.length}
        </span>
      </header>

      <SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
        <ol ref={handleListRefChange} className="flex-1 space-y-2.5 overflow-y-auto pt-2 pr-0.5">
          {cardIds.length > 0 ? (
            cardIds.map((cardId) => {
              const row = cardsById[cardId];
              if (!row) return null;

              return (
                <ConversationsKanbanSortableCard
                  key={cardId}
                  cardId={cardId}
                  row={row}
                  stage={stage}
                  activeDragCardId={activeDragCardId}
                />
              );
            })
          ) : (
            <li className="list-none px-1">
              <p className="text-[11px] tracking-wide text-zinc-400">
                No conversations in this stage
              </p>
            </li>
          )}
        </ol>
      </SortableContext>
    </section>
  );
}
