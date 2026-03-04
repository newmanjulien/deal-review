import Image from "next/image";
import { Plus } from "lucide-react";

export function Share() {
  return (
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
  );
}
