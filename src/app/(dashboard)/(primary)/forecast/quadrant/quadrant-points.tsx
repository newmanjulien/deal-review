import type { QuadrantPoint } from "./quadrant-types";

type QuadrantPointsProps = {
  points: QuadrantPoint[];
  onHover: (
    point: QuadrantPoint,
    clientPosition: { x: number; y: number },
  ) => void;
  onMove: (clientPosition: { x: number; y: number }) => void;
};

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
              onHover(point, {
                x: event.clientX,
                y: event.clientY,
              });
            }}
            onMouseMove={(event) => {
              onMove({
                x: event.clientX,
                y: event.clientY,
              });
            }}
          >
            <circle
              cx={point.xPx}
              cy={point.yPx}
              r={6}
              fill={point.color}
              fillOpacity={0.85}
            />
            <text
              x={point.xPx + point.labelOffset}
              y={point.yPx + 4}
              textAnchor={point.labelAnchor}
              fontSize="12"
              fill="#71717a"
            >
              {point.label}
            </text>
          </g>
        );
      })}
    </>
  );
}
