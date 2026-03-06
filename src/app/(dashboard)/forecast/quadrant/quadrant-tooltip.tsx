import type { CSSProperties } from "react";
import { QUADRANT_TOOLTIP_CONFIG } from "./quadrant-config";
import type { QuadrantPoint } from "./quadrant-types";

type QuadrantTooltipProps = {
  hoveredPoint: QuadrantPoint | null;
  hoverPosition: { x: number; y: number } | null;
  hoverBounds: { width: number; height: number } | null;
  disagreeThreshold: number;
};

export function QuadrantTooltip({
  hoveredPoint,
  hoverPosition,
  hoverBounds,
  disagreeThreshold,
}: QuadrantTooltipProps) {
  if (!hoveredPoint || !hoverPosition || !hoverBounds) return null;

  const delta = hoveredPoint.y - hoveredPoint.x;
  const absDelta = Math.abs(delta);
  const body =
    absDelta <= disagreeThreshold ? undefined : hoveredPoint.description;
  const { width, offset, edgePadding } = QUADRANT_TOOLTIP_CONFIG;
  const style: CSSProperties = {
    left: Math.max(
      edgePadding,
      Math.min(
        hoverPosition.x + offset.x,
        hoverBounds.width - width - edgePadding,
      ),
    ),
    top: Math.max(hoverPosition.y + offset.y, edgePadding),
    width,
  };

  return (
    <div
      className="pointer-events-none absolute rounded-sm border border-zinc-200 bg-white px-3 py-2 text-xs shadow-sm"
      style={style}
    >
      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-zinc-900">
          {hoveredPoint.label} deal
        </p>

        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
          <div className="contents">
            <span className="whitespace-nowrap tracking-wide text-zinc-400">
              Current
            </span>
            <span className="min-w-0 break-words tracking-wide text-zinc-800">
              {hoveredPoint.x}%
            </span>
          </div>
          <div className="contents">
            <span className="whitespace-nowrap tracking-wide text-zinc-400">
              Overbase
            </span>
            <span className="min-w-0 break-words tracking-wide text-zinc-800">
              {hoveredPoint.y}%
            </span>
          </div>
          <div className="contents">
            <span className="whitespace-nowrap tracking-wide text-zinc-400">
              Gap
            </span>
            <span className="min-w-0 break-words tracking-wide text-zinc-800">
              {delta >= 0 ? "+" : ""}
              {delta} pts
            </span>
          </div>
        </div>

        {body ? (
          <p className="break-words leading-relaxed tracking-wide text-zinc-600">
            {body}
          </p>
        ) : null}
      </div>
    </div>
  );
}
