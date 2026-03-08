export const DEAL_STAGES = [
  "Discovery",
  "Proposal",
  "Negotiation",
  "Closed won",
  "Closed lost",
] as const;

export type DealStage = (typeof DEAL_STAGES)[number];

export type DealSnapshot = {
  id: string;
  deal: string;
  probability: number;
  stage: DealStage;
};
