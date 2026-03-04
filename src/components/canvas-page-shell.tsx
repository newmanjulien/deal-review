import type { ReactNode } from "react";
import { NotesPanel } from "@/components/notes-panel";

export function CanvasPageShell({ children }: { children?: ReactNode }) {
  return (
    <div className="grid h-full min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_24rem]">
      <section className="min-h-0 min-w-0 overflow-x-hidden">
        {children}
      </section>
      <div className="hidden h-full min-h-0 overflow-hidden lg:block">
        <NotesPanel />
      </div>
    </div>
  );
}
