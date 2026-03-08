import Link from "next/link";
import { ChevronRight, Ellipsis } from "lucide-react";
import type { HeaderPerson } from "@/components/canvas/canvas-types";
import type { PrimaryPageHeaderLeadingControl } from "../../dashboard-routes";
import { MeetingDateMenu } from "./meeting-date-menu";
import { SellerSwitchMenu } from "./seller-switch-menu";
import { ShareMenu } from "./share-menu";

type PrimaryHeaderProps = {
  leading: PrimaryPageHeaderLeadingControl;
  breadcrumbLabel: string;
  sharedPeople: HeaderPerson[];
};

function HeaderLeadingControl({
  leading,
}: {
  leading: PrimaryPageHeaderLeadingControl;
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

export function PrimaryHeader({
  leading,
  breadcrumbLabel,
  sharedPeople,
}: PrimaryHeaderProps) {
  return (
    <header className="hidden items-center border-b border-zinc-100 p-1.5 md:flex">
      <HeaderLeadingControl leading={leading} />
      <ChevronRight className="h-3 w-3 text-zinc-200" />
      <p className="ml-2 text-xs font-medium tracking-wide text-zinc-900">
        {breadcrumbLabel}
      </p>
      <ShareMenu people={sharedPeople} />
      <SellerSwitchMenu people={sharedPeople} />
      <button
        type="button"
        aria-label="aria"
        className="flex h-7 w-7 items-center justify-center rounded-sm border border-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-100"
      >
        <Ellipsis className="h-3 w-3" />
      </button>
    </header>
  );
}
