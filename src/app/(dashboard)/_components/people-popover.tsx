import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const people = [
  {
    name: "Aditya Newman",
    avatar: "/avatars/aditya.jpg",
  },
  {
    name: "Yash Patel",
    avatar: "/avatars/yash.webp",
  },
];

const peoplePopoverContentId = "header-people-popover-content";

export function PeoplePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="aria"
          className="flex h-7 w-7 items-center justify-center rounded-sm border border-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-100"
        >
          <ArrowLeftRight className="h-3 w-3" />
        </button>
      </PopoverTrigger>
      <PopoverContent id={peoplePopoverContentId} align="end" className="w-64 p-0.5">
        <ul className="mt-1 space-y-1">
          {people.map((person) => (
            <li key={person.name}>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-zinc-700 transition-colors hover:bg-zinc-100"
              >
                <span className="inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full border border-zinc-200">
                  <Image
                    src={person.avatar}
                    alt={`${person.name} avatar`}
                    width={28}
                    height={28}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="font-medium">{person.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
