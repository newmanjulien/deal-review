"use client";

import { useState } from "react";
import { CanvasPageShell } from "@/components/canvas/canvas-page";
import {
  DashboardTable,
  DashboardTableBody,
  DashboardTableHead,
  DashboardTableHeader,
  DashboardTableRow,
} from "@/components/dashboard-table";
import { TableCell } from "@/components/ui/table";

const tabs = [
  { id: "activity", label: "Activity" },
  { id: "accounts", label: "Accounts" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const activityItems = [
  {
    id: "new-issue",
    title: "New issue detected",
    time: "36 min ago",
    body: "Interfere flagged the incident after observing a surge in failed password reset attempts. Metrics showed a spike in users clicking on reset links but not completing the reset flow. Error rates crossed the anomaly threshold within ten minutes of deployment.",
  },
  {
    id: "session-analysis",
    title: "Session analysis",
    time: "35 min ago",
    body: 'Password reset links were clicked successfully, but users never reached the final "Password updated" confirmation screen.',
  },
] as const;

const accountsBreakdown = [
  { account: "Mobile web", impacted: "7,214", share: "56%" },
  { account: "Desktop web", impacted: "4,790", share: "37%" },
  { account: "API clients", impacted: "877", share: "7%" },
] as const;

export function SinceLastMeetingPageClient() {
  const [activeTab, setActiveTab] = useState<TabId>("activity");

  return (
    <CanvasPageShell
      title="Since your last meeting with Juan"
      description="A spike in users clicking on reset links but not completing the reset flow was detected. Error rates surged within ten minutes of the latest deployment."
    >
      <section className="space-y-4">
        <div className="flex items-center gap-6 border-b border-zinc-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
                activeTab === tab.id ? "text-zinc-900" : "text-zinc-500"
              }`}
            >
              {tab.label}
              {activeTab === tab.id ? (
                <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
              ) : null}
            </button>
          ))}
        </div>

        {activeTab === "activity" ? (
          <ol className="space-y-5 pt-1">
            {activityItems.map((item, index) => (
              <li key={item.id} className="relative pl-5">
                <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-zinc-300" />
                {index < activityItems.length - 1 ? (
                  <span className="absolute bottom-[-1.6rem] left-[2px] top-6 w-px bg-zinc-200" />
                ) : null}
                <div className="flex flex-wrap items-baseline gap-2">
                  <h2 className="text-xs leading-relaxed font-medium tracking-wide text-zinc-700">
                    {item.title}
                  </h2>
                  <p className="text-xs tracking-wide text-zinc-400">
                    {item.time}
                  </p>
                </div>
                <p className="mt-1 text-xs leading-relaxed tracking-wide text-zinc-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        ) : null}

        {activeTab === "accounts" ? (
          <div className="space-y-3 pt-1">
            <DashboardTable>
              <DashboardTableHeader>
                <DashboardTableRow>
                  <DashboardTableHead>Account</DashboardTableHead>
                  <DashboardTableHead>Impacted</DashboardTableHead>
                  <DashboardTableHead>Share</DashboardTableHead>
                </DashboardTableRow>
              </DashboardTableHeader>

              <DashboardTableBody>
                {accountsBreakdown.map((row) => (
                  <DashboardTableRow key={row.account}>
                    <TableCell className="whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wide text-zinc-900">
                      {row.account}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600">
                      {row.impacted}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-500">
                      {row.share}
                    </TableCell>
                  </DashboardTableRow>
                ))}
              </DashboardTableBody>
            </DashboardTable>
          </div>
        ) : null}
      </section>
    </CanvasPageShell>
  );
}
