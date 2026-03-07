"use client";

import { useEffect, useRef, useState } from "react";
import { MobileDrawer } from "./mobile-drawer";
import { MobileHeader } from "./mobile-header";

export function MobileNavigation() {
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
    <>
      <MobileDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        triggerRef={menuButtonRef}
      />
      <MobileHeader
        onToggleNav={() => setIsMobileNavOpen((current) => !current)}
        menuButtonRef={menuButtonRef}
      />
    </>
  );
}
