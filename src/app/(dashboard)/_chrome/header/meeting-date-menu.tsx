import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { HEADER_MENU_CONFIG } from "./header-config";
import { HEADER_MEETING_DATES } from "./header-data";
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

export function MeetingDateMenu({
  id = HEADER_MENU_CONFIG.meetingDate.id,
  triggerId = HEADER_MENU_CONFIG.meetingDate.triggerId,
  align = "start",
  triggerClassName,
  open,
  onOpenChange,
}: MeetingDateMenuProps = {}) {
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
            {HEADER_MEETING_DATES[0]} {HEADER_MENU_CONFIG.meetingDate.triggerSuffix}
          </span>
        </button>
      }
    >
      <HeaderMenuSectionLabel>
        {HEADER_MENU_CONFIG.meetingDate.sectionLabel}
      </HeaderMenuSectionLabel>
      <HeaderMenuList>
        {HEADER_MEETING_DATES.map((date) => (
          <li key={date}>
            <HeaderMenuItem>
              <span className="font-medium">{date}</span>
            </HeaderMenuItem>
          </li>
        ))}
      </HeaderMenuList>
    </HeaderMenu>
  );
}
