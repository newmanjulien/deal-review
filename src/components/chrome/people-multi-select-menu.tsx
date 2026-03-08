"use client";

import Image from "next/image";
import { useMemo, useState, type ReactElement, type ReactNode } from "react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ChromeMenu,
  type ChromeMenuAlign,
} from "./chrome-menu";

export type SelectablePerson = {
  name: string;
  avatar: string;
};

type PeopleMultiSelectMenuProps = {
  people: SelectablePerson[];
  trigger: ReactElement;
  sectionLabel: string;
  contentId?: string;
  align?: ChromeMenuAlign;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderLeading?: (selectedPeople: SelectablePerson[]) => ReactNode;
  className?: string;
  containerClassName?: string;
  triggerGroupClassName?: string;
};

function toggleSelectedName(
  currentNames: string[],
  selectedName: string,
  checked: boolean,
) {
  const hasName = currentNames.includes(selectedName);
  if (checked && !hasName) {
    return [...currentNames, selectedName];
  }
  if (!checked && hasName) {
    return currentNames.filter((name) => name !== selectedName);
  }
  return currentNames;
}

export function PeopleMultiSelectMenu({
  people,
  trigger,
  sectionLabel,
  contentId,
  align = "end",
  open,
  onOpenChange,
  renderLeading,
  className,
  containerClassName,
  triggerGroupClassName,
}: PeopleMultiSelectMenuProps) {
  const [selectedNames, setSelectedNames] = useState<string[]>(
    people.map((person) => person.name),
  );

  const selectedNameSet = useMemo(() => new Set(selectedNames), [selectedNames]);
  const selectedPeople = useMemo(
    () => people.filter((person) => selectedNameSet.has(person.name)),
    [people, selectedNameSet],
  );

  return (
    <div className={containerClassName}>
      <div className={cn("flex items-center", triggerGroupClassName)}>
        {renderLeading ? renderLeading(selectedPeople) : null}
        <ChromeMenu
          contentId={contentId}
          align={align}
          open={open}
          onOpenChange={onOpenChange}
          trigger={trigger}
          className={className}
        >
          <DropdownMenuLabel className="px-3 pt-3 pb-1 text-xs font-medium tracking-wide text-zinc-500">
            {sectionLabel}
          </DropdownMenuLabel>
          <ul className="mt-1 space-y-1">
            {people.map((person) => (
              <li key={person.name}>
                <DropdownMenuCheckboxItem
                  className="gap-2 rounded-md py-1 pr-2 text-xs"
                  checked={selectedNameSet.has(person.name)}
                  onCheckedChange={(checked) => {
                    setSelectedNames((current) =>
                      toggleSelectedName(current, person.name, checked === true),
                    );
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
                </DropdownMenuCheckboxItem>
              </li>
            ))}
          </ul>
        </ChromeMenu>
      </div>
    </div>
  );
}
