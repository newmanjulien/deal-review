"use client";

import { useSortable } from "@dnd-kit/sortable";
import { ChartPie } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { KANBAN_CARD_WIDTH_PX } from "./conversations-kanban-constants";
import { createCardDragId } from "./conversations-kanban-utils";
import type {
  ConversationRow,
  ConversationStage,
  KanbanCardId,
} from "../conversations-types";

type ConversationsKanbanCardViewProps = {
  row: ConversationRow;
  className?: string;
};

function ConversationsKanbanCardView({
  row,
  className,
}: ConversationsKanbanCardViewProps) {
  return (
    <article
      className={cn(
        "rounded-sm border border-zinc-100 bg-white p-2",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] tracking-wide text-zinc-500">
          #{row.cardNumber}
        </p>

        {row.ownerAvatar ? (
          <span className="inline-flex size-6.5 shrink-0 overflow-hidden rounded-full border border-white bg-zinc-50">
            <Image
              src={row.ownerAvatar}
              alt={`${row.owner} avatar`}
              width={26}
              height={26}
              className="h-full w-full object-cover"
            />
          </span>
        ) : (
          <span className="inline-flex size-7 shrink-0 rounded-full border border-white bg-zinc-200" />
        )}
      </div>

      <div className="mt-0.5">
        <h3 className="text-xs leading-snug tracking-wide text-zinc-800">
          {row.deal}
        </h3>
      </div>

      <div className="mt-1.5 inline-flex items-center gap-1 rounded-sm border border-zinc-100 px-2 py-0.5 text-[11px] tracking-wide text-zinc-700">
        <ChartPie className="size-2.5 text-zinc-400" />
        {`${row.probability}% likely to close`}
      </div>
    </article>
  );
}

type ConversationsKanbanSortableCardProps = {
  cardId: KanbanCardId;
  row: ConversationRow;
  stage: ConversationStage;
  activeDragCardId: KanbanCardId | null;
};

export function ConversationsKanbanSortableCard({
  cardId,
  row,
  stage,
  activeDragCardId,
}: ConversationsKanbanSortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: createCardDragId(cardId),
    data: {
      cardId,
      stage,
    },
  });

  const style: CSSProperties = {
    transition,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const isActiveDragCard = activeDragCardId === cardId;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab list-none touch-none active:cursor-grabbing",
        (isDragging || isActiveDragCard) && "opacity-0",
      )}
      {...attributes}
      {...listeners}
    >
      <ConversationsKanbanCardView row={row} />
    </li>
  );
}

type ConversationsKanbanDragOverlayCardProps = {
  row: ConversationRow;
};

export function ConversationsKanbanDragOverlayCard({
  row,
}: ConversationsKanbanDragOverlayCardProps) {
  return (
    <div
      className="pointer-events-none"
      style={{ width: KANBAN_CARD_WIDTH_PX }}
    >
      <ConversationsKanbanCardView
        row={row}
        className="shadow-lg ring-1 ring-zinc-200/80"
      />
    </div>
  );
}
