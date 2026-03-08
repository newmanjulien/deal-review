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
