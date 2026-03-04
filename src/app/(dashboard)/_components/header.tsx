import Image from "next/image";
import { Calendar, ChevronRight, Plus } from "lucide-react";
import { PeoplePopover } from "./people-popover";

export function Header() {
  return (
    <header className="hidden items-center border-b border-zinc-100 p-1.5 md:flex">
      <button
        type="button"
        aria-label="aria"
        className="mr-2 ml-1 flex items-center gap-3 text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-400"
      >
        <Calendar className="h-3 w-3" />
        <span>January 26</span>
      </button>
      <ChevronRight className="h-3 w-3 text-zinc-200" />
      <p className="ml-2 text-xs font-medium tracking-wide text-zinc-900">
        Since last meeting
      </p>
      <div className="ml-auto mr-2 flex items-center">
        <div className="flex items-center -space-x-2">
          <button
            type="button"
            aria-label="aria"
            className="inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white"
          >
            <Image
              src="/avatars/aditya.jpg"
              alt="Avatar 1"
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </button>
          <button
            type="button"
            aria-label="aria"
            className="inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white"
          >
            <Image
              src="/avatars/yash.webp"
              alt="Avatar 2"
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </button>
          <button
            type="button"
            aria-label="aria"
            className="relative z-10 inline-flex h-7 w-7 shrink-0 appearance-none items-center justify-center rounded-full border border-dotted border-zinc-300 bg-white text-zinc-400 ring-1 ring-white transition-colors hover:bg-zinc-100"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
      <PeoplePopover />
    </header>
  );
}
