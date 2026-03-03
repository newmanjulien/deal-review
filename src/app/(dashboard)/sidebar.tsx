"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  Activity,
  CircleQuestionMark,
  LayoutGrid,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { SidebarNav } from "./sidebar-nav";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const primaryNavItems: NavItem[] = [
  { href: "/", label: "Activity", icon: Activity },
  { href: "/forecast", label: "Forecast", icon: LayoutGrid },
  { href: "/questions", label: "Questions", icon: CircleQuestionMark },
  { href: "/ideas", label: "Ideas", icon: Lightbulb },
];

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const activeHref =
    primaryNavItems.find((item) => isNavItemActive(pathname, item.href))
      ?.href ?? null;

  const setIndicatorVars = useCallback(
    (vars: {
      top?: number;
      left?: number;
      width?: number;
      height?: number;
      opacity?: number;
    }) => {
      const indicatorEl = indicatorRef.current;
      if (!indicatorEl) return;
      if (typeof vars.top === "number") {
        indicatorEl.style.setProperty(
          "--sidebar-nav-indicator-top",
          `${vars.top}px`,
        );
      }
      if (typeof vars.left === "number") {
        indicatorEl.style.setProperty(
          "--sidebar-nav-indicator-left",
          `${vars.left}px`,
        );
      }
      if (typeof vars.width === "number") {
        indicatorEl.style.setProperty(
          "--sidebar-nav-indicator-width",
          `${vars.width}px`,
        );
      }
      if (typeof vars.height === "number") {
        indicatorEl.style.setProperty(
          "--sidebar-nav-indicator-height",
          `${vars.height}px`,
        );
      }
      if (typeof vars.opacity === "number") {
        indicatorEl.style.setProperty(
          "--sidebar-nav-indicator-opacity",
          `${vars.opacity}`,
        );
      }
    },
    [],
  );

  const updateIndicator = useCallback(
    (href: string | null) => {
      const container = navRef.current;
      if (!container || !href) {
        setIndicatorVars({ opacity: 0 });
        return;
      }

      const el = itemRefs.current[href];
      if (!el) {
        setIndicatorVars({ opacity: 0 });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setIndicatorVars({
        top: rect.top - containerRect.top,
        left: rect.left - containerRect.left,
        width: rect.width,
        height: rect.height,
        opacity: 1,
      });
    },
    [setIndicatorVars],
  );

  useLayoutEffect(() => {
    updateIndicator(hoveredHref ?? activeHref);
  }, [activeHref, hoveredHref, updateIndicator]);

  useLayoutEffect(() => {
    if (!navRef.current) return;

    const observer = new ResizeObserver(() => {
      updateIndicator(hoveredHref ?? activeHref);
    });

    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [activeHref, hoveredHref, updateIndicator]);

  return (
    <aside className="flex h-full flex-col items-start p-2">
      <div className="mb-4 overflow-hidden rounded-sm">
        <Image
          src="/logo.png"
          alt="Logo"
          width={20}
          height={20}
          className="size-6"
          priority
        />
      </div>

      <SidebarNav
        items={primaryNavItems}
        activeHref={activeHref}
        setHoveredHref={setHoveredHref}
        navRef={navRef}
        indicatorRef={indicatorRef}
        itemRefs={itemRefs}
      />
    </aside>
  );
}
