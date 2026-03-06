import Image from "next/image";
import { HEADER_PEOPLE } from "@/components/canvas/canvas-data";
import {
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuList,
  HeaderMenuSectionLabel,
} from "./header-menu";

const HEADER_PEOPLE_POPOVER_CONTENT_ID = "header-people-popover-content";

export function SellerSwitchMenu() {
  return (
    <HeaderMenu
      id={HEADER_PEOPLE_POPOVER_CONTENT_ID}
      align="end"
      trigger={
        <button
          type="button"
          aria-label="aria"
          className="mr-2 flex h-7 items-center justify-center rounded-sm border border-zinc-100 px-2 text-xs font-medium text-zinc-500 tracking-wide transition-colors hover:bg-zinc-100"
        >
          Switch
        </button>
      }
    >
      <HeaderMenuSectionLabel>Switch to another seller</HeaderMenuSectionLabel>
      <HeaderMenuList>
        {HEADER_PEOPLE.map((person) => (
          <li key={person.name}>
            <HeaderMenuItem>
              <span className="inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full border border-zinc-200">
                <Image
                  src={person.avatar}
                  alt={`${person.name} avatar`}
                  width={28}
                  height={28}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="font-medium">{person.name}</span>
            </HeaderMenuItem>
          </li>
        ))}
      </HeaderMenuList>
    </HeaderMenu>
  );
}
