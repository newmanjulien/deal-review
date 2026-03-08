"use client";

import type { ReactNode } from "react";
import { useDashboardSidebar } from "@/app/(dashboard)/_nav/sidebar/sidebar-ui";
import { CanvasWorkspaceShell } from "@/components/canvas/canvas-workspace-shell";
import { DashboardHeaderSlot } from "../_header";
import {
  QuestionComposerConnected,
  QuestionsPanelConnected,
  QuestionsProvider,
} from "./_questions";

export function PrimaryLayoutShell({ children }: { children: ReactNode }) {
  const { isExpanded } = useDashboardSidebar();
  const showQuestionsRail = !isExpanded;

  return (
    <QuestionsProvider>
      <CanvasWorkspaceShell
        header={<DashboardHeaderSlot />}
        showRightPanel={showQuestionsRail}
        rightPanel={showQuestionsRail ? <QuestionsPanelConnected /> : null}
        bottomBar={showQuestionsRail ? <QuestionComposerConnected /> : null}
      >
        {children}
      </CanvasWorkspaceShell>
    </QuestionsProvider>
  );
}
