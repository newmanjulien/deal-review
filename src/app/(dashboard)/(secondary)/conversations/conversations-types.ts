export type ConversationStage =
  | "Discovery"
  | "Proposal"
  | "Negotiation"
  | "Closed won"
  | "Closed lost";

export type ConversationRow = {
  id: string;
  cardNumber: number;
  probability: number;
  contact: string;
  deal: string;
  owner: string;
  ownerAvatar: string;
  stage: ConversationStage;
  lastUpdate: string;
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
