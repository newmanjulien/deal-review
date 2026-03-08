import type { ConversationStage } from "../conversations-types";

export const KANBAN_STAGES: ConversationStage[] = [
  "Discovery",
  "Proposal",
  "Negotiation",
  "Closed won",
  "Closed lost",
];

export const KANBAN_COLUMN_WIDTH_PX = 272;
export const KANBAN_COLUMN_GAP_PX = 12;
export const KANBAN_CARD_WIDTH_PX = 232;
export const SCROLL_EDGE_EPSILON_PX = 4;
export const DRAG_SCROLL_EDGE_THRESHOLD_PX = 36;
export const DRAG_SCROLL_MAX_STEP_PX = 16;
export const KANBAN_OVERLAY_Z_INDEX = 1000;
export const KANBAN_DROP_ANIMATION_DURATION_MS = 180;

export const OWNER_AVATAR_BY_NAME: Record<string, string> = {
  "Aditya Newman": "/avatars/aditya.jpg",
  "Yash Patel": "/avatars/yash.webp",
};

export const CARD_NUMBER_BY_ID: Record<string, number> = {
  "northwind-health-maya-rodriguez": 87,
  "aperture-labs-nolan-pierce": 65,
  "bluebird-logistics-leah-kim": 42,
  "helix-financial-priya-nanda": 31,
};
