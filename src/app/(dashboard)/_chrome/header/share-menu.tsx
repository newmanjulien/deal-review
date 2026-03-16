"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import type { HeaderPerson } from "@/types/domain/people";
import { HEADER_MENU_CONFIG } from "./header-config";
import { PeopleMultiSelectMenu } from "@/components/chrome";

type ShareMenuProps = {
  people: HeaderPerson[];
  id?: string;
  triggerId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ShareMenu({
  people,
  id = HEADER_MENU_CONFIG.share.id,
  triggerId = HEADER_MENU_CONFIG.share.triggerId,
  open,
  onOpenChange,
}: ShareMenuProps) {
  return (
    <PeopleMultiSelectMenu
      people={people}
      contentId={id}
      align="end"
      open={open}
      onOpenChange={onOpenChange}
      sectionLabel={HEADER_MENU_CONFIG.share.sectionLabel}
      containerClassName="mr-2 flex items-center"
      triggerGroupClassName="-space-x-1"
      trigger={
        <button
          id={triggerId}
          type="button"
          aria-label="Share with team members"
          className="relative z-10 inline-flex h-7 w-7 shrink-0 appearance-none items-center justify-center rounded-full border-[1.5px] border-dotted border-zinc-300 bg-white text-zinc-400 ring-1 ring-white transition-colors hover:bg-zinc-100"
        >
          <Plus className="h-3 w-3" />
        </button>
      }
      renderLeading={(selectedPeople) =>
        selectedPeople.map((person) => (
          <span
            key={person.name}
            className="inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full border-2 border-white"
          >
            <Image
              src={person.avatar}
              alt={`${person.name} avatar`}
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </span>
        ))
      }
    />
  );
}
