import type { CSSProperties } from "react";

type ChartTooltipRow = {
  label: string;
  value: string;
};

type ChartTooltipProps = {
  title?: string;
  rows?: ChartTooltipRow[];
  body?: string;
  position: { x: number; y: number };
  bounds: { width: number; height: number };
  offset?: { x: number; y: number };
  width?: number;
};

export function ChartTooltip({
  title,
  rows,
  body,
  position,
  bounds,
  offset,
  width,
}: ChartTooltipProps) {
  const resolvedOffset = { x: 12, y: -64, ...offset };
  const resolvedWidth = width ?? 240;
  const style: CSSProperties = {
    left: Math.max(
      12,
      Math.min(position.x + resolvedOffset.x, bounds.width - resolvedWidth - 12),
    ),
    top: Math.max(position.y + resolvedOffset.y, 12),
    width: resolvedWidth,
  };

  return (
    <div
      className="pointer-events-none absolute rounded-sm border border-zinc-200 bg-white px-3 py-2 text-xs shadow-sm"
      style={style}
    >
      <div className="space-y-2">
        {title ? (
          <p className="text-xs font-medium tracking-wide text-zinc-900">{title}</p>
        ) : null}

        {rows?.length ? (
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            {rows.map((row) => (
              <div key={`${row.label}-${row.value}`} className="contents">
                <span className="whitespace-nowrap tracking-wide text-zinc-400">
                  {row.label}
                </span>
                <span className="min-w-0 break-words tracking-wide text-zinc-800">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {body ? (
          <p className="break-words leading-relaxed tracking-wide text-zinc-600">
            {body}
          </p>
        ) : null}
      </div>
    </div>
  );
}
