import { lastMeetingActivityItems } from "../last-meeting-data";

export function ActivitySection() {
  return (
    <ol className="space-y-5 pt-1">
      {lastMeetingActivityItems.map((item, index) => (
        <li key={item.id} className="relative pl-5">
          <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-zinc-300" />
          {index < lastMeetingActivityItems.length - 1 ? (
            <span className="absolute bottom-[-1.6rem] left-[2px] top-6 w-px bg-zinc-200" />
          ) : null}
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="text-xs leading-relaxed font-medium tracking-wide text-zinc-700">
              {item.title}
            </h2>
            <p className="text-xs tracking-wide text-zinc-400">{item.time}</p>
          </div>
          <p className="mt-1 text-xs leading-relaxed tracking-wide text-zinc-600">
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
