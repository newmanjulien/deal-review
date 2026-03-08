import type { DataDisplayTimelineItem } from "@/app/(dashboard)/(primary)/_shared/data-display-types";

type TimelineSectionProps = {
  items: DataDisplayTimelineItem[];
};

export function TimelineSection({ items }: TimelineSectionProps) {
  const lastItemIndex = items.length - 1;

  return (
    <ol className="relative space-y-5 pt-1">
      {items.length > 1 ? (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[2.5px] top-0 w-px bg-zinc-200"
        />
      ) : null}
      {items.map((item, index) => (
        <li key={item.id} className="relative pl-5">
          {index === 0 ? (
            <span
              aria-hidden
              className="pointer-events-none absolute left-[2.5px] top-0 h-[9px] w-px bg-[var(--canvas-bg)]"
            />
          ) : null}
          {index === lastItemIndex ? (
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-[2.5px] top-[9px] w-px bg-[var(--canvas-bg)]"
            />
          ) : null}
          <span className="absolute left-0 top-1.5 z-10 h-1.5 w-1.5 rounded-full bg-zinc-300 ring-4 ring-[var(--canvas-bg)]" />
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="text-xs leading-relaxed font-medium tracking-wide text-zinc-700">
              {item.title}
            </h2>
            <p className="text-xs tracking-wide text-zinc-400">{item.date}</p>
          </div>
          <p className="mt-1 text-xs leading-relaxed tracking-wide text-zinc-600">
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
