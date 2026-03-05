"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MobileHeader } from "./_components/mobile/mobile-header";
import { MobileDrawer } from "./_components/mobile/mobile-drawer";
import { Sidebar } from "./_components/sidebar";

export function LayoutClient({ children }: { children: ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const onMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileNavOpen(false);
      }
    };

    mediaQuery.addEventListener("change", onMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", onMediaQueryChange);
  }, []);

  return (
    <div className="h-dvh min-h-dvh overflow-hidden bg-zinc-50">
      <MobileDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        triggerRef={menuButtonRef}
      />
      <div className="dashboard-canvas flex h-full min-h-0">
        <Sidebar className="hidden md:flex" />
        <main className="min-w-0 flex min-h-0 flex-1 flex-col overflow-hidden bg-white md:rounded-sm md:border md:border-zinc-100">
          <MobileHeader
            isNavOpen={isMobileNavOpen}
            onToggleNav={() => setIsMobileNavOpen((current) => !current)}
            menuButtonRef={menuButtonRef}
          />
          <div className="flex min-h-0 flex-1 overflow-hidden">{children}</div>
        </main>
      </div>
    </div>
  );
}
