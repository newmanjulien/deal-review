import Image from "next/image";
import {
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuList,
  HeaderMenuSectionLabel,
} from "./header-menu";

const people = [
  {
    name: "Aditya Newman",
    avatar: "/avatars/aditya.jpg",
  },
  {
    name: "Yash Patel",
    avatar: "/avatars/yash.webp",
  },
];

const peoplePopoverContentId = "header-people-popover-content";

export function Switch() {
  return (
    <HeaderMenu
      id={peoplePopoverContentId}
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
