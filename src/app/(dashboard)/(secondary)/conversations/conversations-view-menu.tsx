"use client";

import {
  DASHBOARD_HEADER_ACTION_SLOTS,
  DashboardHeaderActionPortal,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuList,
  HeaderMenuSectionLabel,
} from "@/app/(dashboard)/_chrome/header";
import { useDashboardChromeUi } from "@/app/(dashboard)/_chrome/chrome-ui";
import type { ConversationView } from "./conversations-route-state";

const VIEW_MENU_ID = "desktop-conversations-view";

const VIEW_OPTIONS: Array<{ id: ConversationView; label: string }> = [
  { id: "kanban", label: "Kanban view" },
  { id: "table", label: "Table view" },
];

type ConversationsViewMenuProps = {
  activeView: ConversationView;
  onViewChange: (view: ConversationView) => void;
};

export function ConversationsViewMenu({
  activeView,
  onViewChange,
}: ConversationsViewMenuProps) {
  const { actions } = useDashboardChromeUi();
  const activeViewLabel =
    VIEW_OPTIONS.find((option) => option.id === activeView)?.label ?? activeView;

  return (
    <DashboardHeaderActionPortal
      slot={DASHBOARD_HEADER_ACTION_SLOTS.desktopLeadingAfterTitle}
    >
      <HeaderMenu
        id="desktop-conversations-view-menu-content"
        align="start"
        open={actions.isMenuOpen(VIEW_MENU_ID)}
        onOpenChange={(open) => actions.setMenuOpen(VIEW_MENU_ID, open)}
        trigger={
          <button
            id="desktop-conversations-view-menu-trigger"
            type="button"
            aria-label="Change conversations view"
            className="inline-flex items-center text-xs font-medium tracking-wide text-zinc-900 transition-colors hover:text-zinc-700"
          >
            <span>{activeViewLabel}</span>
          </button>
        }
      >
        <HeaderMenuSectionLabel>Select conversations view</HeaderMenuSectionLabel>
        <HeaderMenuList>
          {VIEW_OPTIONS.map((option) => {
            const isActive = option.id === activeView;

            return (
              <li key={option.id}>
                <HeaderMenuItem
                  className={isActive ? "font-medium text-zinc-900" : undefined}
                  onSelect={() => onViewChange(option.id)}
                >
                  <span>{option.label}</span>
                </HeaderMenuItem>
              </li>
            );
          })}
        </HeaderMenuList>
      </HeaderMenu>
    </DashboardHeaderActionPortal>
  );
}
