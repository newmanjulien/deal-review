export type ConversationStage =
  | "Discovery"
  | "Proposal"
  | "Negotiation"
  | "Closed won"
  | "Closed lost";

export type ConversationRow = {
  id: string;
  company: string;
  contact: string;
  topic: string;
  owner: string;
  stage: ConversationStage;
  lastUpdate: string;
};

export type KanbanCardId = ConversationRow["id"];

export type KanbanState = {
  cardsById: Record<KanbanCardId, ConversationRow>;
  columnCardIds: Record<ConversationStage, KanbanCardId[]>;
};

export type KanbanCardLocation = {
  stage: ConversationStage;
  index: number;
};

export type KanbanDragState = {
  cardId: KanbanCardId;
  originStage: ConversationStage;
  originIndex: number;
};

export type KanbanDestination = KanbanCardLocation;

export type KanbanCardDragId = `card:${string}`;
export type KanbanColumnDragId = `column:${ConversationStage}`;
export type KanbanDragId = KanbanCardDragId | KanbanColumnDragId;

export type KanbanPointer = {
  x: number;
  y: number;
};
