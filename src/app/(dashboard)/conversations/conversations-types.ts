export type ConversationStage =
  | "Discovery"
  | "Proposal"
  | "Negotiation"
  | "Closed won";

export type ConversationRow = {
  company: string;
  contact: string;
  topic: string;
  owner: string;
  stage: ConversationStage;
  lastUpdate: string;
};

export type ConversationColumnKey =
  | "company"
  | "contact"
  | "topic"
  | "owner"
  | "stage"
  | "lastUpdate";

export type ConversationColumn = {
  key: ConversationColumnKey;
  label: string;
};
