import {
  CircleOff,
  Compass,
  FileText,
  Handshake,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { ConversationStage } from "../conversations-types";

export type KanbanColumnEmptyStateContent = {
  icon: LucideIcon;
  description: string;
};

export const KANBAN_COLUMN_EMPTY_STATE_CONTENT: Record<
  ConversationStage,
  KanbanColumnEmptyStateContent
> = {
  Discovery: {
    icon: Compass,
    description: "Early-stage replies and first-call notes land in this lane",
  },
  Proposal: {
    icon: FileText,
    description: "Pricing, scope, and proposal conversations belong here",
  },
  Negotiation: {
    icon: Handshake,
    description: "Contract redlines and procurement back-and-forth live here",
  },
  "Closed won": {
    icon: Trophy,
    description: "Move signed opportunities here to keep pipeline clean",
  },
  "Closed lost": {
    icon: CircleOff,
    description: "Track stalled or lost opportunities in this lane",
  },
};
