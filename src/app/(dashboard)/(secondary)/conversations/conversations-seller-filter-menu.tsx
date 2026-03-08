"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { HeaderPerson } from "@/components/canvas/canvas-types";
import {
  HeaderMenu,
  HeaderMenuCheckboxItem,
  HeaderMenuList,
  HeaderMenuSectionLabel,
} from "@/app/(dashboard)/(primary)/_header/header-menu";

type ConversationsSellerFilterMenuProps = {
  people: HeaderPerson[];
};

export function ConversationsSellerFilterMenu({
  people,
}: ConversationsSellerFilterMenuProps) {
  const [selectedPeople, setSelectedPeople] = useState<string[]>(
    people.map((person) => person.name),
  );

  const selectedPeopleSet = useMemo(
    () => new Set(selectedPeople),
    [selectedPeople],
  );

  return (
    <HeaderMenu
      id="conversations-seller-filter-menu"
      align="end"
      trigger={
        <button
          type="button"
          aria-label="aria"
          className="mr-0.5 flex h-7 items-center justify-center rounded-sm border border-zinc-100 px-2 text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:bg-zinc-100"
        >
          Filter sellers
        </button>
      }
    >
      <HeaderMenuSectionLabel>
        Filter conversations by seller
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
  );
}
