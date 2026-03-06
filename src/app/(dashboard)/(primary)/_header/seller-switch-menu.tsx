import Image from "next/image";
import { HEADER_MENU_CONFIG } from "./header-config";
import { HEADER_PEOPLE } from "./header-data";
import {
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuList,
  HeaderMenuSectionLabel,
} from "./header-menu";

export function SellerSwitchMenu() {
  return (
    <HeaderMenu
      id={HEADER_MENU_CONFIG.sellerSwitch.id}
      align="end"
      trigger={
        <button
          id={HEADER_MENU_CONFIG.sellerSwitch.triggerId}
          type="button"
          aria-label="aria"
          className="mr-2 flex h-7 items-center justify-center rounded-sm border border-zinc-100 px-2 text-xs font-medium text-zinc-500 tracking-wide transition-colors hover:bg-zinc-100"
        >
          {HEADER_MENU_CONFIG.sellerSwitch.triggerLabel}
        </button>
      }
    >
      <HeaderMenuSectionLabel>
        {HEADER_MENU_CONFIG.sellerSwitch.sectionLabel}
      </HeaderMenuSectionLabel>
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
