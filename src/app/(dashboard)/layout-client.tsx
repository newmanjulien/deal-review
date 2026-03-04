"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Header } from "./_components/header";
import { MobileHeader } from "./_components/mobile-header";
import { MobileDrawer } from "./_components/mobile-drawer";
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
    <div className="min-h-dvh bg-zinc-50">
      <MobileDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        triggerRef={menuButtonRef}
      />
      <div className="dashboard-canvas flex min-h-dvh">
        <Sidebar className="hidden md:flex" />
        <main className="min-w-0 flex-1 overflow-hidden bg-white md:rounded-sm md:border md:border-zinc-100">
          <div className="flex min-h-full flex-col">
            <MobileHeader
              isNavOpen={isMobileNavOpen}
              onToggleNav={() => setIsMobileNavOpen((current) => !current)}
              menuButtonRef={menuButtonRef}
            />
            <Header />
            <div className="min-h-0 flex-1">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
