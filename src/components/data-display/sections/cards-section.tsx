import Image from "next/image";
import { Building, Lightbulb } from "lucide-react";
import {
  PriorityGridIcon,
  type PriorityGridVariant,
} from "./priority-grid-icon";
import type {
  DataDisplayCard,
  DataDisplayCardPriority,
} from "../data-display-types";

const PRIORITY_ICON_VARIANT: Record<
  DataDisplayCardPriority,
  PriorityGridVariant
> = {
  high: "full-grid",
  medium: "half-grid",
  low: "quarter-grid",
};

type CardsSectionProps = {
  cards: DataDisplayCard[];
};

type CardAvatarsProps = {
  cardId: string;
  avatars: DataDisplayCard["avatars"];
};

function CardAvatars({ cardId, avatars }: CardAvatarsProps) {
  const isStacked = avatars.length === 2;

  return (
    <div className={isStacked ? "relative h-[26px] w-7 shrink-0" : "flex items-center -space-x-1"}>
      {avatars.map((avatar, index) => (
        <span
          key={`${cardId}-${avatar}-${index}`}
          className={
            isStacked
              ? `absolute inline-flex size-5 shrink-0 overflow-hidden rounded-full border border-white bg-zinc-50 ${
                  index === 0 ? "left-0 top-0 z-10" : "left-[8px] top-[7px]"
                }`
              : "inline-flex size-5 shrink-0 overflow-hidden rounded-full border border-white bg-zinc-50"
          }
        >
          <Image
            src={avatar}
            alt={`Card ${cardId} avatar ${index + 1}`}
            width={20}
            height={20}
            className="h-full w-full object-cover"
          />
        </span>
      ))}
    </div>
  );
}

export function CardsSection({ cards }: CardsSectionProps) {
  return (
    <ol className="space-y-2.5 pt-1">
      {cards.map((card) => (
        <li
          key={card.id}
          className="rounded-lg border border-zinc-100 px-3 py-3 shadow-[0_1px_1px_rgba(24,24,27,0.04)]"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-[10px] tracking-wide text-zinc-500">
              #{card.id}
            </p>
            <CardAvatars cardId={card.id} avatars={card.avatars} />
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <Lightbulb className="size-3 text-zinc-500" />
            <h2 className="text-xs leading-snug tracking-wide text-zinc-800">
              {card.title}
            </h2>
          </div>

          <div className="mt-3.5 space-y-1.5">
            <div className="h-2 rounded-[3px] bg-zinc-200/90" />
            <div className="h-2 rounded-[3px] bg-zinc-200/90" />
            <div className="h-2 w-1/3 rounded-[3px] bg-zinc-200/90" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md border border-zinc-100 px-2 py-0.5 text-[11px] tracking-wide text-zinc-800">
              <Building className="size-2.5 text-zinc-400" />
              {card.dealLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-zinc-100 px-2 py-0.5 text-[11px] tracking-wide text-zinc-800">
              <PriorityGridIcon
                variant={PRIORITY_ICON_VARIANT[card.priority]}
                className="size-2.5 text-zinc-400"
              />
              {card.priorityLabel}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
