"use client";

import { useState } from "react";
import { CanvasPageShell } from "@/components/canvas/canvas-page";
import { ActivitySection } from "./sections/activity-section";
import { AccountsSection } from "./sections/accounts-section";
import { type TabId } from "./dummy-data";
import { SectionTabs } from "./section-tabs";

export function SinceLastMeetingPageClient() {
  const [activeTab, setActiveTab] = useState<TabId>("activity");

  return (
    <CanvasPageShell
      title="Since your last meeting with Juan"
      description="A spike in users clicking on reset links but not completing the reset flow was detected. Error rates surged within ten minutes of the latest deployment."
    >
      <section className="space-y-4">
        <SectionTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "activity" ? <ActivitySection /> : null}
        {activeTab === "accounts" ? <AccountsSection /> : null}
      </section>
    </CanvasPageShell>
  );
}
