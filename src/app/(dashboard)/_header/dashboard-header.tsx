import Link from "next/link";
import { ChevronRight, Ellipsis, PanelLeft } from "lucide-react";
import { useDashboardSidebar } from "@/app/(dashboard)/_nav/sidebar/sidebar-ui";
import {
  type DashboardHeaderData,
  type DashboardHeaderLeadingControl,
} from "@/app/(dashboard)/dashboard-routes";
import { CanvasHeaderFrame } from "@/components/canvas/canvas-header-frame";
import { MeetingDateMenu } from "./meeting-date-menu";
import { SellerSwitchMenu } from "./seller-switch-menu";
import { ShareMenu } from "./share-menu";

function HeaderLeadingControl({
  leading,
}: {
  leading: DashboardHeaderLeadingControl;
}) {
  if (leading.kind === "meeting-date") {
    return <MeetingDateMenu />;
  }

  return (
    <Link
      href={leading.href}
      className="mr-2 ml-1 inline-flex items-center text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-400"
    >
      <span>{leading.label}</span>
    </Link>
  );
}

export function DashboardHeader({
  leading,
  breadcrumbs,
  sharedPeople,
}: DashboardHeaderData) {
  const { isExpanded, toggleSidebar } = useDashboardSidebar();
  const people = sharedPeople ?? [];
  const showPeopleActions = people.length > 0;

  return (
    <CanvasHeaderFrame
      leading={
        <>
          <button
            type="button"
            className="mr-1 ml-1 inline-flex items-center text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-400"
            onClick={toggleSidebar}
          >
            <PanelLeft className="h-3.5 w-3.5" />
            <span className="sr-only">
              {isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            </span>
          </button>
          <HeaderLeadingControl leading={leading} />

          <nav aria-label="aria" className="flex min-w-0 items-center">
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

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
              <ShareMenu people={people} />
              <SellerSwitchMenu people={people} />
            </>
          ) : null}
          <button
            type="button"
            aria-label="aria"
            className="flex h-7 w-7 items-center justify-center rounded-sm border border-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-100"
          >
            <Ellipsis className="h-3 w-3" />
          </button>
        </>
      }
    />
  );
}
