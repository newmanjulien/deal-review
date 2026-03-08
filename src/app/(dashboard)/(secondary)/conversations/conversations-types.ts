import { DEAL_STAGES, type DealSnapshot } from "@/types/deals";
import type { IsoDateTimeString } from "@/types/date-time";

export const CONVERSATION_STAGES = DEAL_STAGES;
export type ConversationStage = (typeof CONVERSATION_STAGES)[number];

export type ConversationRow = DealSnapshot & {
  cardNumber: number;
  contact: string;
  owner: string;
  ownerAvatar: string;
  lastActivityAtIso: IsoDateTimeString;
};

export type KanbanCardId = ConversationRow["id"];

export type KanbanCardLocation = {
  stage: ConversationStage;
  index: number;
};

export type KanbanState = {
  cardsById: Record<KanbanCardId, ConversationRow>;
  columnCardIds: Record<ConversationStage, KanbanCardId[]>;
  cardLocationsById: Record<KanbanCardId, KanbanCardLocation>;
};

export type KanbanDragState = {
  cardId: KanbanCardId;
  originStage: ConversationStage;
  originIndex: number;
};

export type KanbanDestination = KanbanCardLocation;

export type KanbanCardDragId = `card:${string}`;
export type KanbanColumnDragId = `column:${ConversationStage}`;

export type KanbanPointer = {
  x: number;
  y: number;
};
