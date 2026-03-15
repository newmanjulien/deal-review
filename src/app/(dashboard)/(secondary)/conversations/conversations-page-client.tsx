"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CanvasWidePage } from "@/components/canvas/canvas-page";
import { useMediaQuery } from "@/lib/use-media-query";
import { conversationsData } from "./conversations-data";
import {
  buildConversationsHref,
  type ConversationView,
} from "./conversations-route-state";
import { ConversationsSellerFilterMenu } from "./conversations-seller-filter-menu";
import { ConversationsTable } from "./conversations-table";
import { ConversationsViewMenu } from "./conversations-view-menu";
import { ConversationsKanban } from "./kanban/conversations-kanban";
import {
  buildRowsFromBoardState,
  useConversationsBoardState,
} from "./use-conversations-board-state";

type ConversationsPageClientProps = {
  initialDesktopView: ConversationView;
};

export function ConversationsPageClient({
  initialDesktopView,
}: ConversationsPageClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [desktopView, setDesktopView] = useState(initialDesktopView);
  const { boardState, setBoardState, persistBoardStateNow } =
    useConversationsBoardState();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const effectiveView = isDesktop ? desktopView : "table";
  const tableRows = useMemo(
    () => (effectiveView === "table" ? buildRowsFromBoardState(boardState) : null),
    [boardState, effectiveView],
  );

  useEffect(() => {
    setDesktopView(initialDesktopView);
  }, [initialDesktopView]);

  const handleDesktopViewChange = (nextView: ConversationView) => {
    if (nextView === desktopView) {
      return;
    }

    setDesktopView(nextView);

    startTransition(() => {
      router.replace(buildConversationsHref(pathname, nextView), {
        scroll: false,
      });
    });
  };

  return (
    <CanvasWidePage fillHeight>
      <ConversationsSellerFilterMenu people={conversationsData.views.sellerPeople} />
      <ConversationsViewMenu
        activeView={desktopView}
        onViewChange={handleDesktopViewChange}
      />
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
