"use client";

import type { HeaderPerson } from "@/app/(dashboard)/_chrome/chrome-types";
import { PeopleMultiSelectMenu } from "@/components/chrome";

type ConversationsSellerFilterMenuProps = {
  people: HeaderPerson[];
};

export function ConversationsSellerFilterMenu({
  people,
}: ConversationsSellerFilterMenuProps) {
  return (
    <PeopleMultiSelectMenu
      people={people}
      contentId="conversations-seller-filter-menu"
      align="end"
      sectionLabel="Filter conversations by seller"
      trigger={
        <button
          type="button"
          aria-label="Filter sellers"
          className="mr-0.5 flex h-7 items-center justify-center rounded-sm border border-zinc-100 px-2 text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:bg-zinc-100"
        >
          Filter sellers
        </button>
      }
    />
  );
}
