import { QUADRANT_TOOLTIP_CONFIG } from "./quadrant-config";
import type { QuadrantPoint } from "./quadrant-types";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

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
  const { width, offset, edgePadding } = QUADRANT_TOOLTIP_CONFIG;

  const position =
    !hoverPosition || !hoverBounds
      ? null
      : (() => {
          const maxLeft = Math.max(edgePadding, hoverBounds.width - width - edgePadding);
          return {
            left: clamp(hoverPosition.x + offset.x, edgePadding, maxLeft),
            top: Math.max(hoverPosition.y + offset.y, edgePadding),
          };
        })();

  if (!hoveredPoint || !hoverPosition || !hoverBounds) return null;

  const delta = hoveredPoint.y - hoveredPoint.x;
  const absDelta = Math.abs(delta);
  const body =
    absDelta <= disagreeThreshold ? undefined : hoveredPoint.description;

  return (
    <div
      style={{
        left: position?.left,
        top: position?.top,
        width,
      }}
      className="pointer-events-none absolute rounded-sm border border-border bg-popover px-3 py-2 text-xs shadow-sm"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-foreground">
          {hoveredPoint.label} deal
        </p>

        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
          <div className="contents">
            <span className="whitespace-nowrap tracking-wide text-muted-foreground">
              Current
            </span>
            <span className="min-w-0 break-words tracking-wide text-foreground">
              {hoveredPoint.x}%
            </span>
          </div>
          <div className="contents">
            <span className="whitespace-nowrap tracking-wide text-muted-foreground">
              Overbase
            </span>
            <span className="min-w-0 break-words tracking-wide text-foreground">
              {hoveredPoint.y}%
            </span>
          </div>
          <div className="contents">
            <span className="whitespace-nowrap tracking-wide text-muted-foreground">
              Gap
            </span>
            <span className="min-w-0 break-words tracking-wide text-foreground">
              {delta >= 0 ? "+" : ""}
              {delta} pts
            </span>
          </div>
        </div>

        {body ? (
          <p className="break-words leading-relaxed tracking-wide text-muted-foreground">
            {body}
          </p>
        ) : null}
      </div>
    </div>
  );
}
