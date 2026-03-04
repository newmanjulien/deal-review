import { Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const dates = [
  "January 26 meeting",
  "January 12 meeting",
  "December 29 meeting",
  "December 15 meeting",
  "December 1 meeting",
];

const datesPopoverContentId = "header-dates-popover-content";

export function Date() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="aria"
          className="mr-2 ml-1 flex items-center gap-3 text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-400"
        >
          <Calendar className="h-3 w-3" />
          <span>January 26 meeting</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        id={datesPopoverContentId}
        align="start"
        className="w-64 p-0.5"
      >
        <ul className="m-1 space-y-2">
          {dates.map((date) => (
            <li key={date}>
              <button
                type="button"
                className="flex w-full items-center rounded-md px-3 py-2 text-left text-xs text-zinc-700 transition-colors hover:bg-zinc-100"
              >
                <span className="font-medium">{date}</span>
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
