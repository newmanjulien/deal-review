"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

type SidebarNavMotionOptions = {
  activeHref: string | null;
  hoveredHref: string | null;
};

type IndicatorVars = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  opacity?: number;
};

export function useSidebarNavMotion({
  activeHref,
  hoveredHref,
}: SidebarNavMotionOptions) {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const setIndicatorVars = useCallback((vars: IndicatorVars) => {
    const indicatorEl = indicatorRef.current;
    if (!indicatorEl) return;

    if (typeof vars.top === "number") {
      indicatorEl.style.setProperty("--sidebar-nav-indicator-top", `${vars.top}px`);
    }
    if (typeof vars.left === "number") {
      indicatorEl.style.setProperty("--sidebar-nav-indicator-left", `${vars.left}px`);
    }
    if (typeof vars.width === "number") {
      indicatorEl.style.setProperty("--sidebar-nav-indicator-width", `${vars.width}px`);
    }
    if (typeof vars.height === "number") {
      indicatorEl.style.setProperty("--sidebar-nav-indicator-height", `${vars.height}px`);
    }
    if (typeof vars.opacity === "number") {
      indicatorEl.style.setProperty("--sidebar-nav-indicator-opacity", `${vars.opacity}`);
    }
  }, []);

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

  const setItemRef = useCallback((href: string, el: HTMLSpanElement | null) => {
    itemRefs.current[href] = el;
  }, []);

  return {
    navRef,
    indicatorRef,
    setItemRef,
  };
}
