"use client";

import type { ReactNode } from "react";
import { Header } from "./header";
import { NotesPanel } from "./notes-panel";
import { Sidebar } from "./sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-zinc-50">
      <div className="flex min-h-dvh">
        <div className="w-10 shrink-0">
          <Sidebar />
        </div>
        <main className="min-w-0 flex-1 overflow-hidden rounded-l-sm border-l border-zinc-200 bg-white">
          <div className="flex min-h-dvh flex-col">
            <Header />
            <div className="flex min-h-0 flex-1">
              <section className="min-h-0 flex-1">{children}</section>
              <NotesPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
