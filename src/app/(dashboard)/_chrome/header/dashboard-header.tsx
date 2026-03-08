import Link from "next/link";
import { ChevronRight, Ellipsis, PanelLeft } from "lucide-react";
import { useDashboardChromeUi } from "@/app/(dashboard)/_chrome/chrome-ui";
import type { DashboardChromeModel } from "@/app/(dashboard)/_routes/dashboard-routes";
import { DesktopChromeHeaderShell } from "@/components/chrome";
import { HeaderLeadingControl } from "./header-leading-control";
import { SellerSwitchMenu } from "./seller-switch-menu";
import { ShareMenu } from "./share-menu";

const MENU_IDS = {
  meetingDate: "desktop-meeting-date",
  share: "desktop-share",
  sellerSwitch: "desktop-seller-switch",
} as const;

export function DashboardHeader({ chrome }: { chrome: DashboardChromeModel }) {
  const {
    state: { isSidebarExpanded },
    actions,
  } = useDashboardChromeUi();

  const people = chrome.header.sharedPeople ?? [];
  const showPeopleActions = people.length > 0;

  return (
    <DesktopChromeHeaderShell
      leading={
        <>
          <button
            type="button"
            aria-label="Toggle sidebar"
            className="mr-1 ml-1 inline-flex items-center text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-400"
            onClick={actions.toggleSidebar}
          >
            <PanelLeft className="h-3.5 w-3.5" />
            <span className="sr-only">
              {isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
            </span>
          </button>

          <HeaderLeadingControl
            leading={chrome.header.leadingControl}
            meetingDateMenuId="desktop-header-dates-popover-content"
            meetingDateTriggerId="desktop-header-dates-popover-trigger"
            meetingDateAlign="start"
            meetingDateOpen={actions.isMenuOpen(MENU_IDS.meetingDate)}
            onMeetingDateOpenChange={(open) =>
              actions.setMenuOpen(MENU_IDS.meetingDate, open)
            }
          />

          <nav aria-label="Header breadcrumbs" className="flex min-w-0 items-center">
            {chrome.header.breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === chrome.header.breadcrumbs.length - 1;

              return (
                <span
                  key={`${breadcrumb.label}-${index}`}
                  className="flex min-w-0 items-center"
                >
                  <ChevronRight className="mr-2 h-3 w-3 text-zinc-200" />
                  {breadcrumb.href && !isLast ? (
                    <Link
                      href={breadcrumb.href}
                      className="mr-2 inline-flex items-center text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-400"
                    >
                      {breadcrumb.label}
                    </Link>
                  ) : (
                    <p
                      className={`min-w-0 truncate text-xs font-medium tracking-wide ${
                        isLast ? "text-zinc-900" : "mr-2 text-zinc-500"
                      }`}
                    >
                      {breadcrumb.label}
                    </p>
                  )}
                </span>
              );
            })}
          </nav>
        </>
      }
      trailing={
        <>
          {showPeopleActions ? (
            <>
              <ShareMenu
                people={people}
                id="desktop-share-menu-content"
                triggerId="desktop-share-menu-trigger"
                open={actions.isMenuOpen(MENU_IDS.share)}
                onOpenChange={(open) => actions.setMenuOpen(MENU_IDS.share, open)}
              />
              <SellerSwitchMenu
                people={people}
                id="desktop-people-popover-content"
                triggerId="desktop-people-popover-trigger"
                open={actions.isMenuOpen(MENU_IDS.sellerSwitch)}
                onOpenChange={(open) =>
                  actions.setMenuOpen(MENU_IDS.sellerSwitch, open)
                }
              />
            </>
          ) : null}
          <button
            type="button"
            aria-label="More actions"
            className="flex h-7 w-7 items-center justify-center rounded-sm border border-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-100"
          >
            <Ellipsis className="h-3 w-3" />
          </button>
        </>
      }
    />
  );
}
