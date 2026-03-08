"use client";

import { useRef } from "react";
import { useDashboardChromeUi } from "@/app/(dashboard)/_chrome/chrome-ui";
import { MobileDrawer } from "./mobile-drawer";
import { MobileHeader } from "./mobile-header";

export function MobileNavigation() {
  const {
    state: { isMobileDrawerOpen },
    actions,
  } = useDashboardChromeUi();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => actions.setMobileDrawerOpen(false)}
        triggerRef={menuButtonRef}
      />
      <MobileHeader
        onToggleNav={actions.toggleMobileDrawer}
        menuButtonRef={menuButtonRef}
      />
    </>
  );
}
