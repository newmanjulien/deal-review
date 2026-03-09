import Image from "next/image";
import Link from "next/link";
import {
  PriorityGridIcon,
  type PriorityGridVariant,
} from "./priority-grid-icon";
import type {
  DataDisplayTile,
  DataDisplayTilePriority,
  DataDisplayTableRow,
} from "@/components/data-display/data-display-types";

const PRIORITY_ICON_VARIANT: Record<
  DataDisplayTilePriority,
  PriorityGridVariant
> = {
  high: "full-grid",
  medium: "half-grid",
  low: "quarter-grid",
};

type TileListSectionProps = {
  tiles: DataDisplayTile<DataDisplayTableRow>[];
};

type TileAvatarsProps = {
  tileId: string;
  avatars: DataDisplayTile["avatars"];
};

function TileAvatars({ tileId, avatars }: TileAvatarsProps) {
  const isStacked = avatars.length === 2;

  return (
    <div
      className={
        isStacked ? "relative h-5 w-7 shrink-0" : "flex items-center -space-x-1"
      }
    >
      {avatars.map((avatar, index) => (
        <span
          key={`${tileId}-${avatar}-${index}`}
          className={
            isStacked
              ? `absolute inline-flex size-5 shrink-0 overflow-hidden rounded-full border border-white bg-zinc-50 ${
                  index === 0 ? "left-0 top-0 z-10" : "left-[9px] top-0"
                }`
              : "inline-flex size-5 shrink-0 overflow-hidden rounded-full border border-white bg-zinc-50"
          }
        >
          <Image
            src={avatar}
            alt={`Tile ${tileId} avatar ${index + 1}`}
            width={20}
            height={20}
            className="h-full w-full object-cover"
          />
        </span>
      ))}
    </div>
  );
}

export function TileListSection({ tiles }: TileListSectionProps) {
  return (
    <ol className="space-y-2.5 pt-1">
      {tiles.map((tile) => {
        const TileIcon = tile.icon;
        const tileContent = (
          <>
            <div className="flex items-start justify-between gap-3">
              <p className="text-[10px] tracking-wide text-zinc-500">#{tile.id}</p>
              <TileAvatars tileId={tile.id} avatars={tile.avatars} />
            </div>

            <div className="mt-2 flex items-center gap-1.5">
              <TileIcon className="size-3 text-zinc-500" />
              <h2 className="text-xs leading-snug tracking-wide text-zinc-800">
                {tile.title}
              </h2>
            </div>

            <div className="mt-3.5 space-y-1.5">
              <div className="h-2 rounded-[3px] bg-zinc-200/90" />
              <div className="h-2 rounded-[3px] bg-zinc-200/90" />
              <div className="h-2 w-1/3 rounded-[3px] bg-zinc-200/90" />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md border border-zinc-100 px-2 py-0.5 text-[11px] tracking-wide text-zinc-800">
                <span aria-hidden className="size-2 rounded-[2px] bg-zinc-300" />
                {tile.dealLabel}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-zinc-100 px-2 py-0.5 text-[11px] tracking-wide text-zinc-800">
                <PriorityGridIcon
                  variant={PRIORITY_ICON_VARIANT[tile.priority]}
                  className="size-2.5 text-zinc-400"
                />
                {tile.priorityLabel}
              </span>
            </div>
          </>
        );

        const tileBaseClassName = "rounded-md border border-zinc-100 px-3 py-3";

        return (
          <li key={tile.id}>
            {tile.href ? (
              <Link
                href={tile.href}
                className={`${tileBaseClassName} block transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300`}
              >
                {tileContent}
              </Link>
            ) : (
              <div className={tileBaseClassName}>{tileContent}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
