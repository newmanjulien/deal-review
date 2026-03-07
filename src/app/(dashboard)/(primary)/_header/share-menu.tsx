"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import type { HeaderPerson } from "@/components/canvas/canvas-types";
import { HEADER_MENU_CONFIG } from "./header-config";
import {
  HeaderMenu,
  HeaderMenuCheckboxItem,
  HeaderMenuList,
  HeaderMenuSectionLabel,
} from "./header-menu";

type ShareMenuProps = {
  people: HeaderPerson[];
};

export function ShareMenu({ people }: ShareMenuProps) {
  const [selectedPeople, setSelectedPeople] = useState<string[]>(
    people.map((person) => person.name),
  );

  const selectedPeopleSet = useMemo(
    () => new Set(selectedPeople),
    [selectedPeople],
  );

  const visibleAvatars = people.filter((person) =>
    selectedPeopleSet.has(person.name),
  );

  return (
    <div className="ml-auto mr-2 flex items-center">
      <div className="flex items-center -space-x-2">
        {visibleAvatars.map((person) => (
          <span
            key={person.name}
            className="inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white"
          >
            <Image
              src={person.avatar}
              alt={`${person.name} avatar`}
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </span>
        ))}
        <HeaderMenu
          id={HEADER_MENU_CONFIG.share.id}
          align="end"
          trigger={
            <button
              id={HEADER_MENU_CONFIG.share.triggerId}
              type="button"
              aria-label="aria"
              className="relative z-10 inline-flex h-7 w-7 shrink-0 appearance-none items-center justify-center rounded-full border border-dotted border-zinc-300 bg-white text-zinc-400 ring-1 ring-white transition-colors hover:bg-zinc-100"
            >
              <Plus className="h-3 w-3" />
            </button>
          }
        >
          <HeaderMenuSectionLabel>
            {HEADER_MENU_CONFIG.share.sectionLabel}
          </HeaderMenuSectionLabel>
          <HeaderMenuList>
            {people.map((person) => (
              <li key={person.name}>
                <HeaderMenuCheckboxItem
                  checked={selectedPeopleSet.has(person.name)}
                  onCheckedChange={(checked) => {
                    const isChecked = checked === true;
                    setSelectedPeople((current) => {
                      const hasPerson = current.includes(person.name);
                      if (isChecked && !hasPerson) {
                        return [...current, person.name];
                      }
                      if (!isChecked && hasPerson) {
                        return current.filter((name) => name !== person.name);
                      }
                      return current;
                    });
                  }}
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
                </HeaderMenuCheckboxItem>
              </li>
            ))}
          </HeaderMenuList>
        </HeaderMenu>
      </div>
    </div>
  );
}
