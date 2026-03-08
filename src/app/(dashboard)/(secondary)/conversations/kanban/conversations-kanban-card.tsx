"use client";

import { useSortable } from "@dnd-kit/sortable";
import { Building, Lightbulb } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import {
  CARD_NUMBER_BY_ID,
  KANBAN_CARD_WIDTH_PX,
  OWNER_AVATAR_BY_NAME,
} from "./conversations-kanban-constants";
import { createCardDragId } from "./conversations-kanban-utils";
import type { KanbanCardId } from "./conversations-kanban-types";
import type { ConversationRow, ConversationStage } from "../conversations-types";

type ConversationsKanbanCardViewProps = {
  row: ConversationRow;
  className?: string;
};

function ConversationsKanbanCardView({
  row,
  className,
}: ConversationsKanbanCardViewProps) {
  const ownerAvatar = OWNER_AVATAR_BY_NAME[row.owner];
  const cardNumber = CARD_NUMBER_BY_ID[row.id] ?? 0;

  return (
    <article
      className={cn(
        "rounded-md border border-zinc-100 bg-white px-3 py-2 shadow-[0_1px_0_rgba(24,24,27,0.04)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] tracking-wide text-zinc-500">#{cardNumber}</p>

        {ownerAvatar ? (
          <span className="inline-flex size-7 shrink-0 overflow-hidden rounded-full border border-white bg-zinc-50">
            <Image
              src={ownerAvatar}
              alt={`${row.owner} avatar`}
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </span>
        ) : (
          <span className="inline-flex size-7 shrink-0 rounded-full border border-white bg-zinc-200" />
        )}
      </div>

      <div className="mt-1.5 flex items-start gap-1.5">
        <Lightbulb className="mt-[2px] size-3 text-zinc-500" />
        <h3 className="text-xs leading-snug tracking-wide text-zinc-800">
          {row.topic}
        </h3>
      </div>

      <div className="mt-1.5 inline-flex items-center gap-1 rounded-md border border-zinc-100 px-2 py-0.5 text-[11px] tracking-wide text-zinc-700">
        <Building className="size-2.5 text-zinc-400" />
        {row.company}
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
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
    <div className="pointer-events-none" style={{ width: KANBAN_CARD_WIDTH_PX }}>
      <ConversationsKanbanCardView
        row={row}
        className="shadow-lg ring-1 ring-zinc-200/80"
      />
    </div>
  );
}
