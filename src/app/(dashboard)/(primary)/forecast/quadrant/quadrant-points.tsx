import type { MouseEvent } from "react";
import type { QuadrantPoint, QuadrantPointerContext } from "./quadrant-types";

type QuadrantPointsProps = {
  points: QuadrantPoint[];
  onHover: (point: QuadrantPoint, pointer: QuadrantPointerContext) => void;
  onMove: (pointer: QuadrantPointerContext) => void;
};

function getPointerContext(
  event: MouseEvent<SVGGElement>,
): QuadrantPointerContext | null {
  const svgElement = event.currentTarget.ownerSVGElement;
  if (!svgElement) {
    return null;
  }

  const bounds = svgElement.getBoundingClientRect();
  if (!bounds.width || !bounds.height) {
    return null;
  }

  return {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top,
    width: bounds.width,
    height: bounds.height,
  };
}

export function QuadrantPoints({
  points,
  onHover,
  onMove,
}: QuadrantPointsProps) {
  return (
    <>
      {points.map((point) => {
        return (
          <g
            key={point.id}
            onMouseEnter={(event) => {
              const pointer = getPointerContext(event);
              if (!pointer) {
                return;
              }
              onHover(point, pointer);
            }}
            onMouseMove={(event) => {
              const pointer = getPointerContext(event);
              if (!pointer) {
                return;
              }
              onMove(pointer);
            }}
          >
            <circle
              cx={point.xPx}
              cy={point.yPx}
              r={5}
              className={`fill-current opacity-[0.85] ${point.colorClassName}`}
            />
            <text
              x={point.xPx + point.labelOffset}
              y={point.yPx + 4}
              textAnchor={point.labelAnchor}
              className="fill-current text-[10px] text-muted-foreground"
            >
              {point.label}
            </text>
          </g>
        );
      })}
    </>
  );
}
