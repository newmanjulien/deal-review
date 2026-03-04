"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Header } from "./header";
import { MobileHeader } from "./mobile-header";
import { MobileNavDrawer } from "./mobile-nav-drawer";
import { NotesPanel } from "./notes-panel";
import { Sidebar } from "./sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        triggerRef={menuButtonRef}
      />
      <div className="flex min-h-dvh">
        <Sidebar className="hidden h-full md:flex" />
        <main className="min-w-0 flex-1 overflow-hidden bg-white md:rounded-l-sm md:border-l md:border-zinc-200">
          <div className="flex min-h-dvh flex-col">
            <MobileHeader
              isNavOpen={isMobileNavOpen}
              onToggleNav={() => setIsMobileNavOpen((current) => !current)}
              menuButtonRef={menuButtonRef}
            />
            <Header />
            <div className="flex min-h-0 flex-1">
              <section className="min-h-0 min-w-0 flex-1 overflow-x-hidden">
                {children}
              </section>
              <div className="hidden lg:block">
                <NotesPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
