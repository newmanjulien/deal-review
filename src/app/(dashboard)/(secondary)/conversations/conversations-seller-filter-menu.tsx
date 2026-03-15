"use client";

import type { HeaderPerson } from "@/types/domain/people";
import {
  DASHBOARD_HEADER_ACTION_SLOTS,
  DashboardHeaderActionPortal,
} from "@/app/(dashboard)/_chrome/header";
import { PeopleMultiSelectMenu } from "@/components/chrome";

type ConversationsSellerFilterMenuProps = {
  people: HeaderPerson[];
};

export function ConversationsSellerFilterMenu({
  people,
}: ConversationsSellerFilterMenuProps) {
  return (
    <DashboardHeaderActionPortal
      slot={DASHBOARD_HEADER_ACTION_SLOTS.desktopTrailingBeforeOverflow}
    >
      <PeopleMultiSelectMenu
        people={people}
        contentId="conversations-seller-filter-menu"
        align="end"
        sectionLabel="Filter conversations by seller"
        trigger={
          <button
            type="button"
            aria-label="Filter seller"
            className="flex h-7 items-center justify-center rounded-sm border border-zinc-100 px-2 text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:bg-zinc-100"
          >
            Filter sellers
          </button>
        }
      />
    </DashboardHeaderActionPortal>
  );
}
