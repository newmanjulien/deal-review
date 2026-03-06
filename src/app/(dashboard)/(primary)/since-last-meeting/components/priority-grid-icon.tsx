import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export type PriorityGridVariant = "full-grid" | "half-grid" | "quarter-grid";

const GRID_CELLS: Array<[row: number, column: number]> = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

const ACTIVE_CELL_KEYS: Record<PriorityGridVariant, Set<string>> = {
  "full-grid": new Set(GRID_CELLS.map(([row, column]) => `${row}:${column}`)),
  "half-grid": new Set(["2:0", "2:1", "2:2", "1:1", "1:2"]),
  "quarter-grid": new Set(["2:0", "2:1", "2:2"]),
};

type PriorityGridIconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  variant: PriorityGridVariant;
};

export function PriorityGridIcon({
  variant,
  className,
  ...props
}: PriorityGridIconProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      {GRID_CELLS.map(([row, column]) => {
        const cellKey = `${row}:${column}`;
        const isActive = ACTIVE_CELL_KEYS[variant].has(cellKey);

        return (
          <rect
            key={cellKey}
            x={1 + column * 4}
            y={1 + row * 4}
            width={2}
            height={2}
            rx={0.4}
            fill="currentColor"
            opacity={isActive ? 1 : 0.25}
          />
        );
      })}
    </svg>
  );
}
