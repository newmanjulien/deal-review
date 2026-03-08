export function normalizeDashboardPathname(pathname: string): string {
  if (!pathname) {
    return "/";
  }

  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function isDashboardPathWithinRoute(
  pathname: string,
  routePath: string,
): boolean {
  const normalizedPathname = normalizeDashboardPathname(pathname);
  const normalizedRoutePath = normalizeDashboardPathname(routePath);

  return (
    normalizedPathname === normalizedRoutePath ||
    normalizedPathname.startsWith(`${normalizedRoutePath}/`)
  );
}
