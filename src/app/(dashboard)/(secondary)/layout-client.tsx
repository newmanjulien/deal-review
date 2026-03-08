import type { ReactNode } from "react";
import { DashboardHeaderSlot } from "@/app/(dashboard)/_chrome/header";
import { CanvasWorkspaceShell } from "@/components/canvas/canvas-workspace-shell";

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <CanvasWorkspaceShell header={<DashboardHeaderSlot />}>
      {children}
    </CanvasWorkspaceShell>
  );
}
