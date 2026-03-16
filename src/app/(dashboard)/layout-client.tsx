"use client";

import type { ReactNode } from "react";
import { DashboardHeaderActionSlotsProvider } from "@/app/(dashboard)/_chrome/header";
import { QuestionsProvider } from "@/app/(dashboard)/_chrome/questions";
import { DashboardChromeProvider, useDashboardChromeUi } from "./_chrome/chrome-ui";
import { MobileNavigation } from "./_nav/mobile";
import { Sidebar } from "./_nav/sidebar/sidebar";

function LayoutClientShell({ children }: { children: ReactNode }) {
  const {
    state: { isSidebarExpanded },
  } = useDashboardChromeUi();

  return (
    <div className="h-dvh min-h-dvh overflow-hidden bg-zinc-50">
      <div
        className="dashboard-canvas flex h-full min-h-0 md:gap-[var(--dashboard-canvas-gap)]"
        data-sidebar-state={isSidebarExpanded ? "expanded" : "collapsed"}
      >
        <Sidebar className="hidden md:flex" />
        <main className="min-w-0 flex min-h-0 flex-1 flex-col overflow-hidden bg-white md:rounded-sm md:border md:border-zinc-100">
          <MobileNavigation />
          <div className="flex min-h-0 flex-1 overflow-hidden">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <DashboardChromeProvider>
      <DashboardHeaderActionSlotsProvider>
        <QuestionsProvider>
          <LayoutClientShell>{children}</LayoutClientShell>
        </QuestionsProvider>
      </DashboardHeaderActionSlotsProvider>
    </DashboardChromeProvider>
  );
}
