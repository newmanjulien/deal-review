import { Calendar } from "lucide-react";
import {
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuList,
  HeaderMenuSectionLabel,
} from "./header-menu";

const dates = [
  "January 26",
  "January 12",
  "December 29",
  "December 15",
  "December 1",
];

const datesPopoverContentId = "header-dates-popover-content";

export function Date() {
  return (
    <HeaderMenu
      id={datesPopoverContentId}
      align="start"
      trigger={
        <button
          type="button"
          aria-label="aria"
          className="mr-2 ml-1 flex items-center gap-3 text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-400"
        >
          <Calendar className="h-3 w-3" />
          <span>January 26 meeting</span>
        </button>
      }
    >
      <HeaderMenuSectionLabel>Select meeting date</HeaderMenuSectionLabel>
      <HeaderMenuList>
        {dates.map((date) => (
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
