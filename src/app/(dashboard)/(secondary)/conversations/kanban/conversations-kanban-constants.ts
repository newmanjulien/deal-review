import {
  CONVERSATION_STAGES,
  type ConversationStage,
} from "../conversations-types";

export const KANBAN_STAGES: readonly ConversationStage[] = CONVERSATION_STAGES;

export const KANBAN_COLUMN_WIDTH_PX = 320;
export const KANBAN_COLUMN_GAP_PX = 12;
export const KANBAN_CARD_WIDTH_PX = KANBAN_COLUMN_WIDTH_PX - 40;
export const SCROLL_EDGE_EPSILON_PX = 4;
export const DRAG_SCROLL_EDGE_THRESHOLD_PX = 36;
export const DRAG_SCROLL_MAX_STEP_PX = 16;
export const KANBAN_OVERLAY_Z_INDEX = 1000;
export const KANBAN_DROP_ANIMATION_DURATION_MS = 180;
