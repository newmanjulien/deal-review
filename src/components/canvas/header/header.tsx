import { ChevronRight, Ellipsis } from "lucide-react";
import { CANVAS_HEADER_CONFIG } from "./header-config";
import { MeetingDateMenu } from "./meeting-date-menu";
import { SellerSwitchMenu } from "./seller-switch-menu";
import { Share } from "./share";

export function Header() {
  return (
    <header className="hidden items-center border-b border-zinc-100 p-1.5 md:flex">
      <MeetingDateMenu />
      <ChevronRight className="h-3 w-3 text-zinc-200" />
      <p className="ml-2 text-xs font-medium tracking-wide text-zinc-900">
        {CANVAS_HEADER_CONFIG.breadcrumbLabel}
      </p>
      <Share />
      <SellerSwitchMenu />
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
