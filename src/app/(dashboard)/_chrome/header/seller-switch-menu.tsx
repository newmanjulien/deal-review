import Image from "next/image";
import type { HeaderPerson } from "@/types/domain/people";
import { HEADER_MENU_CONFIG } from "./header-config";
import {
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuList,
  HeaderMenuSectionLabel,
} from "./header-menu";

type SellerSwitchMenuProps = {
  people: HeaderPerson[];
  id?: string;
  triggerId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function SellerSwitchMenu({
  people,
  id = HEADER_MENU_CONFIG.sellerSwitch.id,
  triggerId = HEADER_MENU_CONFIG.sellerSwitch.triggerId,
  open,
  onOpenChange,
}: SellerSwitchMenuProps) {
  return (
    <HeaderMenu
      id={id}
      align="end"
      open={open}
      onOpenChange={onOpenChange}
      trigger={
        <button
          id={triggerId}
          type="button"
          aria-label="Switch seller"
          className="mr-2 flex h-7 items-center justify-center rounded-sm border border-zinc-100 px-2 text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:bg-zinc-100"
        >
          {HEADER_MENU_CONFIG.sellerSwitch.triggerLabel}
        </button>
      }
    >
      <HeaderMenuSectionLabel>
        {HEADER_MENU_CONFIG.sellerSwitch.sectionLabel}
      </HeaderMenuSectionLabel>
      <HeaderMenuList>
        {people.map((person) => (
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
