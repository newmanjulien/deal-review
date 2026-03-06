"use client";

import { useState } from "react";
import { CanvasPageShell } from "@/components/canvas/canvas-page";
import {
  LAST_MEETING_DEFAULT_TAB_ID,
  LAST_MEETING_PAGE_CONFIG,
} from "./last-meeting-config";
import { ActivitySection } from "./sections/activity-section";
import { AccountsSection } from "./sections/accounts-section";
import { OpportunitiesSection } from "./sections/opportunities-section";
import { type LastMeetingTabId } from "./last-meeting-types";
import { SectionTabs } from "./section-tabs";

export function SinceLastMeetingPageClient() {
  const [activeTab, setActiveTab] = useState<LastMeetingTabId>(
    LAST_MEETING_DEFAULT_TAB_ID,
  );

  return (
    <CanvasPageShell
      title={LAST_MEETING_PAGE_CONFIG.title}
      description={LAST_MEETING_PAGE_CONFIG.description}
    >
      <section className="space-y-4">
        <SectionTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "activity" ? <ActivitySection /> : null}
        {activeTab === "accounts" ? <AccountsSection /> : null}
        {activeTab === "opportunities" ? <OpportunitiesSection /> : null}
      </section>
    </CanvasPageShell>
  );
}
