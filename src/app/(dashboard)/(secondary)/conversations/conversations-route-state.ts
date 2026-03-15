export type ConversationView = "table" | "kanban";

export type ConversationsPageSearchParams = {
  view?: string | string[] | undefined;
};

const CONVERSATIONS_VIEW_QUERY_PARAM = "view";
const DEFAULT_CONVERSATIONS_VIEW: ConversationView = "kanban";

export function parseConversationView(
  rawValue: string | string[] | null | undefined,
): ConversationView {
  const normalizedValue = Array.isArray(rawValue) ? rawValue[0] : rawValue;

  return normalizedValue === "table" ? "table" : DEFAULT_CONVERSATIONS_VIEW;
}

export function buildConversationsHref(
  pathname: string,
  desktopView: ConversationView,
) {
  if (desktopView === DEFAULT_CONVERSATIONS_VIEW) {
    return pathname;
  }

  const searchParams = new URLSearchParams({
    [CONVERSATIONS_VIEW_QUERY_PARAM]: desktopView,
  });

  return `${pathname}?${searchParams.toString()}`;
}
