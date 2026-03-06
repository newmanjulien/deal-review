import { Calendar } from "lucide-react";
import { HEADER_MENU_CONFIG } from "./header-config";
import { HEADER_MEETING_DATES } from "./header-data";
import {
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuList,
  HeaderMenuSectionLabel,
} from "./header-menu";

export function MeetingDateMenu() {
  return (
    <HeaderMenu
      id={HEADER_MENU_CONFIG.meetingDate.id}
      align="start"
      trigger={
        <button
          type="button"
          aria-label="aria"
          className="mr-2 ml-1 flex items-center gap-3 text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-400"
        >
          <Calendar className="h-3 w-3" />
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
