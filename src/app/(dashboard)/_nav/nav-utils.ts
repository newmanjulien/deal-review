import type { NavGroups, NormalizedNavGroups } from "./nav-types";

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function normalizeNavGroups(groups: NavGroups): NormalizedNavGroups {
  const main = groups.main;
  const secondary = groups.secondary ?? [];
  const tertiary = groups.tertiary ?? [];

  return {
    main,
    secondary,
    tertiary,
    hasSecondary: secondary.length > 0,
    showMainSecondaryDivider: main.length > 0 && secondary.length > 0,
  };
}

export function isNavItemActive(pathname: string, href: string): boolean {
  const normalizedPathname = normalizePathname(pathname);
  const normalizedHref = normalizePathname(href);

  if (href === "/") {
    return normalizedPathname === "/";
  }

  return (
    normalizedPathname === normalizedHref ||
    normalizedPathname.startsWith(`${normalizedHref}/`)
  );
}

export function getActiveHref(pathname: string, groups: NavGroups): string | null {
  const normalizedPathname = normalizePathname(pathname);
  const normalizedGroups = normalizeNavGroups(groups);
  const items = [
    ...normalizedGroups.main,
    ...normalizedGroups.secondary,
    ...normalizedGroups.tertiary,
  ];
  return (
    items.find((item) => isNavItemActive(normalizedPathname, item.href))?.href ??
    null
  );
}
