"use client";

import { useState } from "react";
import { CanvasWidePage } from "@/components/canvas/canvas-page";
import { CONVERSATIONS_PAGE_CONFIG } from "./conversations-config";
import { conversationSellerPeople } from "./conversations-data";
import { ConversationsKanban } from "./kanban/conversations-kanban";
import { ConversationsSellerFilterMenu } from "./conversations-seller-filter-menu";
import { ConversationsTable } from "./conversations-table";

type ConversationView = "table" | "kanban";

export function ConversationsPageClient() {
  const [activeView, setActiveView] = useState<ConversationView>("kanban");

  return (
    <CanvasWidePage
      title={CONVERSATIONS_PAGE_CONFIG.title}
      description={CONVERSATIONS_PAGE_CONFIG.description}
    >
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-zinc-100">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveView("kanban")}
              className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
                activeView === "kanban" ? "text-zinc-900" : "text-zinc-500"
              }`}
            >
              Kanban
              {activeView === "kanban" ? (
                <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setActiveView("table")}
              className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
                activeView === "table" ? "text-zinc-900" : "text-zinc-500"
              }`}
            >
              Table
              {activeView === "table" ? (
                <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
              ) : null}
            </button>
          </div>

          <div className="flex items-center gap-2 pb-3">
            <ConversationsSellerFilterMenu people={conversationSellerPeople} />
          </div>
        </div>

        {activeView === "table" ? (
          <ConversationsTable />
        ) : (
          <ConversationsKanban />
        )}
      </section>
    </CanvasWidePage>
  );
}
