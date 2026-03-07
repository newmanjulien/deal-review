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
