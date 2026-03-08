"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  CircleOff,
  Compass,
  FileText,
  Handshake,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type {
  ConversationStage,
  KanbanCardId,
  KanbanState,
} from "../conversations-types";
import { ConversationsKanbanSortableCard } from "./conversations-kanban-card";
import { KANBAN_COLUMN_WIDTH_PX } from "./conversations-kanban-constants";
import {
  createCardDragId,
  createColumnDragId,
} from "./conversations-kanban-utils";

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

type KanbanColumnEmptyStateContent = {
  icon: LucideIcon;
  description: string;
};

const EMPTY_STATE_CONTENT_BY_STAGE: Record<
  ConversationStage,
  KanbanColumnEmptyStateContent
> = {
  Discovery: {
    icon: Compass,
    description: "Early-stage replies and first-call notes land in this lane",
  },
  Proposal: {
    icon: FileText,
    description: "Pricing, scope, and proposal conversations belong here",
  },
  Negotiation: {
    icon: Handshake,
    description: "Contract redlines and procurement back-and-forth live here",
  },
  "Closed won": {
    icon: Trophy,
    description: "Move signed opportunities here to keep pipeline clean",
  },
  "Closed lost": {
    icon: CircleOff,
    description: "Track stalled or lost opportunities in this lane",
  },
};

type ConversationsKanbanColumnEmptyStateProps = {
  stage: ConversationStage;
};

function ConversationsKanbanColumnEmptyState({
  stage,
}: ConversationsKanbanColumnEmptyStateProps) {
  const content = EMPTY_STATE_CONTENT_BY_STAGE[stage];
  const Icon = content.icon;

  return (
    <li className="list-none px-1 pt-13">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-100/20" />
      <div className="relative flex h-full flex-col items-center justify-center gap-2 text-center">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-400">
            <Icon className="size-3" />
          </span>
          <p className="text-xs leading-relaxed tracking-wide text-zinc-500">
            Nothing here yet
          </p>
        </div>

        <p className="max-w-[14rem] text-[11px] text-zinc-400">
          {content.description}
        </p>
      </div>
    </li>
  );
}

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

  return (
    <section
      ref={setNodeRef}
      style={{ width: KANBAN_COLUMN_WIDTH_PX }}
      className={cn(
        "flex h-[clamp(38rem,72dvh,56rem)] snap-start flex-col rounded-sm border border-zinc-200/80 bg-zinc-50/60 p-2.5 transition-colors",
        isOver && "border-zinc-300 bg-zinc-100/60",
      )}
    >
      <header className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-medium tracking-wide text-zinc-600">
            {stage}
          </h2>
        </div>
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-zinc-200/80 text-xs text-zinc-600">
          {cardIds.length}
        </span>
      </header>

      <SortableContext
        items={sortableItems}
        strategy={verticalListSortingStrategy}
      >
        <ol
          ref={(element) => onColumnListRefChange(stage, element)}
          className="flex-1 space-y-2.5 overflow-y-auto pt-2 pr-0.5"
        >
          {cardIds.length > 0 ? (
            cardIds.flatMap((cardId) => {
              const row = cardsById[cardId];
              return row
                ? [
                    <ConversationsKanbanSortableCard
                      key={cardId}
                      cardId={cardId}
                      row={row}
                      stage={stage}
                      activeDragCardId={activeDragCardId}
                    />,
                  ]
                : [];
            })
          ) : !isOver ? (
            <ConversationsKanbanColumnEmptyState stage={stage} />
          ) : null}
        </ol>
      </SortableContext>
    </section>
  );
}
