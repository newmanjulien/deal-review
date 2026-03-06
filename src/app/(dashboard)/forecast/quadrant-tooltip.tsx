import { ChartTooltip } from "./chart-tooltip";
import type { QuadrantPoint } from "./types";

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
  const body = absDelta <= disagreeThreshold ? undefined : hoveredPoint.description;

  return (
    <ChartTooltip
      title={`${hoveredPoint.label} deal`}
      rows={[
        { label: "Current", value: `${hoveredPoint.x}%` },
        { label: "Overbase", value: `${hoveredPoint.y}%` },
        {
          label: "Gap",
          value: `${delta >= 0 ? "+" : ""}${delta} pts`,
        },
      ]}
      body={body}
      position={hoverPosition}
      bounds={hoverBounds}
      offset={{ x: 12, y: -92 }}
      width={320}
    />
  );
}
