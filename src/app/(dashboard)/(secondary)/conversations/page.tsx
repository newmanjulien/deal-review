"use client";

import { Suspense, useMemo } from "react";
import { CanvasWidePage } from "@/components/canvas/canvas-page";
import { useMediaQuery } from "@/lib/use-media-query";
import { conversationsData } from "./conversations-data";
import { ConversationsSellerFilterMenu } from "./conversations-seller-filter-menu";
import { ConversationsTable } from "./conversations-table";
import { ConversationsViewMenu } from "./conversations-view-menu";
import { ConversationsKanban } from "./kanban/conversations-kanban";
import {
  buildRowsFromBoardState,
  useConversationsBoardState,
} from "./use-conversations-board-state";
import {
  type ConversationView,
  useConversationsRouteState,
} from "./use-conversations-route-state";

type ConversationsPageContentProps = {
  desktopView: ConversationView;
  setDesktopView: (view: ConversationView) => void;
};

function ConversationsPageContent({
  desktopView,
  setDesktopView,
}: ConversationsPageContentProps) {
  const { boardState, setBoardState, persistBoardStateNow } =
    useConversationsBoardState();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const effectiveView = isDesktop ? desktopView : "table";
  const tableRows = useMemo(
    () => (effectiveView === "table" ? buildRowsFromBoardState(boardState) : null),
    [boardState, effectiveView],
  );

  return (
    <CanvasWidePage fillHeight>
      <ConversationsSellerFilterMenu people={conversationsData.views.sellerPeople} />
      <ConversationsViewMenu activeView={desktopView} onViewChange={setDesktopView} />
      <section className="flex min-h-0 flex-1 flex-col">
        {effectiveView === "table" ? (
          <ConversationsTable rows={tableRows ?? []} />
        ) : (
          <ConversationsKanban
            boardState={boardState}
            setBoardState={setBoardState}
            onBoardCommit={persistBoardStateNow}
          />
        )}
      </section>
    </CanvasWidePage>
  );
}

function ConversationsPageWithRouteState() {
  const { desktopView, setDesktopView } = useConversationsRouteState();

  return (
    <ConversationsPageContent
      desktopView={desktopView}
      setDesktopView={setDesktopView}
    />
  );
}

export default function ConversationsPage() {
  return (
    <Suspense fallback={null}>
      <ConversationsPageWithRouteState />
    </Suspense>
  );
}
