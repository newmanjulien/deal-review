import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { HEADER_MENU_CONFIG } from "./header-config";
import { headerData } from "./header-data";
import {
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuList,
  HeaderMenuSectionLabel,
} from "./header-menu";

type MeetingDateMenuProps = {
  id?: string;
  triggerId?: string;
  align?: ComponentProps<typeof HeaderMenu>["align"];
  triggerClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const DEFAULT_TRIGGER_CLASS_NAME =
  "mr-2 ml-1 inline-flex items-center text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-400";

const MEETING_DATE_LABEL_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
});

function formatMeetingDateLabel(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return MEETING_DATE_LABEL_FORMATTER.format(date);
}

export function MeetingDateMenu({
  id = HEADER_MENU_CONFIG.meetingDate.id,
  triggerId = HEADER_MENU_CONFIG.meetingDate.triggerId,
  align = "start",
  triggerClassName,
  open,
  onOpenChange,
}: MeetingDateMenuProps = {}) {
  const meetingDateLabels = headerData.views.meetingDateIsos.map(formatMeetingDateLabel);
  const triggerDateLabel = meetingDateLabels[0] ?? "No date";

  return (
    <HeaderMenu
      id={id}
      align={align}
      open={open}
      onOpenChange={onOpenChange}
      trigger={
        <button
          id={triggerId}
          type="button"
          aria-label="Select meeting date"
          className={cn(DEFAULT_TRIGGER_CLASS_NAME, triggerClassName)}
        >
          <span>
            {triggerDateLabel} {HEADER_MENU_CONFIG.meetingDate.triggerSuffix}
          </span>
        </button>
      }
    >
      <HeaderMenuSectionLabel>
        {HEADER_MENU_CONFIG.meetingDate.sectionLabel}
      </HeaderMenuSectionLabel>
      <HeaderMenuList>
        {headerData.views.meetingDateIsos.map((isoDate, index) => (
          <li key={isoDate}>
            <HeaderMenuItem>
              <span className="font-medium">
                {meetingDateLabels[index] ?? isoDate}
              </span>
            </HeaderMenuItem>
          </li>
        ))}
      </HeaderMenuList>
    </HeaderMenu>
  );
}
