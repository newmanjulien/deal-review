"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type ConversationView = "table" | "kanban";

const CONVERSATIONS_VIEW_QUERY_PARAM = "view";
const DEFAULT_CONVERSATIONS_VIEW: ConversationView = "kanban";

function parseConversationView(rawValue: string | null): ConversationView {
  return rawValue === "table" ? "table" : DEFAULT_CONVERSATIONS_VIEW;
}

export function useConversationsRouteState() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const desktopView = parseConversationView(
    searchParams.get(CONVERSATIONS_VIEW_QUERY_PARAM),
  );

  const setDesktopView = useCallback(
    (nextView: ConversationView) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString());

      if (nextView === DEFAULT_CONVERSATIONS_VIEW) {
        nextSearchParams.delete(CONVERSATIONS_VIEW_QUERY_PARAM);
      } else {
        nextSearchParams.set(CONVERSATIONS_VIEW_QUERY_PARAM, nextView);
      }

      const nextQuery = nextSearchParams.toString();
      const nextHref = nextQuery ? `${pathname}?${nextQuery}` : pathname;
      router.replace(nextHref, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return {
    desktopView,
    setDesktopView,
  };
}
