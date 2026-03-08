import type { ReactNode } from "react";
import { DashboardHeaderSlot } from "@/app/(dashboard)/_header";
import { CanvasWorkspaceShell } from "@/components/canvas/canvas-workspace-shell";

export default function SecondaryLayout({ children }: { children: ReactNode }) {
  return (
    <CanvasWorkspaceShell header={<DashboardHeaderSlot />}>
      {children}
    </CanvasWorkspaceShell>
  );
}
