import type { UniqueIdentifier } from "@dnd-kit/core";
import { KANBAN_STAGES } from "./conversations-kanban-constants";
import type {
  KanbanCardId,
  KanbanCardLocation,
  KanbanCardDragId,
  KanbanColumnDragId,
  KanbanDestination,
  KanbanState,
} from "./conversations-kanban-types";
import type { ConversationRow, ConversationStage } from "../conversations-types";

const CARD_DRAG_ID_PREFIX = "card:";
const COLUMN_DRAG_ID_PREFIX = "column:";

function isConversationStage(value: string): value is ConversationStage {
  return KANBAN_STAGES.includes(value as ConversationStage);
}

function createEmptyColumnCardIds(): Record<ConversationStage, KanbanCardId[]> {
  return {
    Discovery: [],
    Proposal: [],
    Negotiation: [],
    "Closed won": [],
    "Closed lost": [],
  };
}

function clampIndex(index: number, length: number): number {
  return Math.max(0, Math.min(index, length));
}

export function createKanbanState(rows: ConversationRow[]): KanbanState {
  const cardsById: Record<KanbanCardId, ConversationRow> = {};
  const columnCardIds = createEmptyColumnCardIds();

  for (const stage of KANBAN_STAGES) {
    columnCardIds[stage] = [];
  }

  for (const row of rows) {
    cardsById[row.id] = row;
    columnCardIds[row.stage].push(row.id);
  }

  return {
    cardsById,
    columnCardIds,
  };
}

export function cloneKanbanState(state: KanbanState): KanbanState {
  const nextColumnCardIds = createEmptyColumnCardIds();

  for (const stage of KANBAN_STAGES) {
    nextColumnCardIds[stage] = [...state.columnCardIds[stage]];
  }

  return {
    cardsById: { ...state.cardsById },
    columnCardIds: nextColumnCardIds,
  };
}

export function restoreFromSnapshot(
  snapshot: KanbanState | null,
  fallbackState: KanbanState,
): KanbanState {
  if (!snapshot) {
    return fallbackState;
  }

  return cloneKanbanState(snapshot);
}

export function createCardDragId(cardId: KanbanCardId): KanbanCardDragId {
  return `${CARD_DRAG_ID_PREFIX}${cardId}`;
}

export function createColumnDragId(stage: ConversationStage): KanbanColumnDragId {
  return `${COLUMN_DRAG_ID_PREFIX}${stage}`;
}

export function parseCardDragId(
  dragId: UniqueIdentifier | null | undefined,
): KanbanCardId | null {
  if (typeof dragId !== "string" || !dragId.startsWith(CARD_DRAG_ID_PREFIX)) {
    return null;
  }

  return dragId.slice(CARD_DRAG_ID_PREFIX.length);
}

export function parseColumnDragId(
  dragId: UniqueIdentifier | null | undefined,
): ConversationStage | null {
  if (typeof dragId !== "string" || !dragId.startsWith(COLUMN_DRAG_ID_PREFIX)) {
    return null;
  }

  const rawStage = dragId.slice(COLUMN_DRAG_ID_PREFIX.length);
  return isConversationStage(rawStage) ? rawStage : null;
}

export function findCardLocation(
  state: KanbanState,
  cardId: KanbanCardId,
): KanbanCardLocation | null {
  for (const stage of KANBAN_STAGES) {
    const index = state.columnCardIds[stage].indexOf(cardId);
    if (index >= 0) {
      return { stage, index };
    }
  }

  return null;
}

export function resolveDestinationFromDragId(
  state: KanbanState,
  dragId: UniqueIdentifier | null | undefined,
): KanbanDestination | null {
  const columnStage = parseColumnDragId(dragId);
  if (columnStage) {
    return {
      stage: columnStage,
      index: state.columnCardIds[columnStage].length,
    };
  }

  const cardId = parseCardDragId(dragId);
  if (!cardId) {
    return null;
  }

  return findCardLocation(state, cardId);
}

export function moveWithinColumn(
  state: KanbanState,
  stage: ConversationStage,
  fromIndex: number,
  toIndex: number,
): KanbanState {
  const columnIds = state.columnCardIds[stage];
  if (fromIndex < 0 || fromIndex >= columnIds.length) {
    return state;
  }

  const targetIndex = clampIndex(toIndex, columnIds.length - 1);
  if (fromIndex === targetIndex) {
    return state;
  }

  const nextColumnIds = [...columnIds];
  const [movedCardId] = nextColumnIds.splice(fromIndex, 1);

  if (!movedCardId) {
    return state;
  }

  nextColumnIds.splice(targetIndex, 0, movedCardId);

  return {
    ...state,
    columnCardIds: {
      ...state.columnCardIds,
      [stage]: nextColumnIds,
    },
  };
}

export function moveAcrossColumns(
  state: KanbanState,
  cardId: KanbanCardId,
  fromStage: ConversationStage,
  toStage: ConversationStage,
  toIndex: number,
): KanbanState {
  const sourceIds = state.columnCardIds[fromStage];
  const destinationIds = state.columnCardIds[toStage];
  const sourceIndex = sourceIds.indexOf(cardId);

  if (sourceIndex < 0) {
    return state;
  }

  const nextSourceIds = sourceIds.filter((id) => id !== cardId);
  const nextDestinationIds = [...destinationIds];
  const destinationIndex = clampIndex(toIndex, nextDestinationIds.length);
  nextDestinationIds.splice(destinationIndex, 0, cardId);

  return {
    ...state,
    columnCardIds: {
      ...state.columnCardIds,
      [fromStage]: nextSourceIds,
      [toStage]: nextDestinationIds,
    },
  };
}

export function moveCardToDestination(
  state: KanbanState,
  cardId: KanbanCardId,
  destination: KanbanDestination,
): KanbanState {
  const currentLocation = findCardLocation(state, cardId);
  if (!currentLocation) {
    return state;
  }

  if (currentLocation.stage === destination.stage) {
    let nextIndex = destination.index;

    if (currentLocation.index < destination.index) {
      nextIndex -= 1;
    }

    return moveWithinColumn(
      state,
      currentLocation.stage,
      currentLocation.index,
      nextIndex,
    );
  }

  return moveAcrossColumns(
    state,
    cardId,
    currentLocation.stage,
    destination.stage,
    destination.index,
  );
}
