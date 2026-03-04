import type { ReactNode } from "react";
import { NotesPanel } from "@/components/notes-panel";

export function CanvasPageShell({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-full min-h-0">
      <section className="min-h-0 min-w-0 flex-1 overflow-x-hidden">
        {children}
      </section>
      <div className="hidden lg:block">
        <NotesPanel />
      </div>
    </div>
  );
}
