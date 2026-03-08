"use client";

import type { ReactNode } from "react";
import { useDashboardSidebar } from "@/app/(dashboard)/_nav";
import { useDashboardChromeModel } from "@/app/(dashboard)/_chrome/chrome-ui";
import { CanvasWorkspaceShell } from "@/components/canvas/canvas-workspace-shell";
import { DashboardHeaderSlot } from "../_chrome/header";
import {
  QuestionComposerConnected,
  QuestionsPanelConnected,
} from "../_questions";

export function LayoutClient({ children }: { children: ReactNode }) {
  const { isExpanded } = useDashboardSidebar();
  const chrome = useDashboardChromeModel();
  const supportsQuestions = Boolean(chrome?.capabilities.questions);
  const showQuestionsRail = supportsQuestions && !isExpanded;

  return (
    <CanvasWorkspaceShell
      header={<DashboardHeaderSlot />}
      showRightPanel={showQuestionsRail}
      rightPanel={showQuestionsRail ? <QuestionsPanelConnected /> : null}
      bottomBar={showQuestionsRail ? <QuestionComposerConnected /> : null}
    >
      {children}
    </CanvasWorkspaceShell>
  );
}
