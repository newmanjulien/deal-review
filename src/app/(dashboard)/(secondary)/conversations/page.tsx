import {
  type ConversationsPageSearchParams,
  parseConversationView,
} from "./conversations-route-state";
import { ConversationsPageClient } from "./conversations-page-client";

type ConversationsPageProps = {
  searchParams: Promise<ConversationsPageSearchParams>;
};

export default async function ConversationsPage({
  searchParams,
}: ConversationsPageProps) {
  const { view } = await searchParams;

  return (
    <ConversationsPageClient initialDesktopView={parseConversationView(view)} />
  );
}
