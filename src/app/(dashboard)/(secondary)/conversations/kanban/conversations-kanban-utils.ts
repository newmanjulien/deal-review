import type { UniqueIdentifier } from "@dnd-kit/core";
import { KANBAN_STAGES } from "./conversations-kanban-constants";
import type {
  ConversationRow,
  ConversationStage,
  KanbanCardDragId,
  KanbanCardId,
  KanbanCardLocation,
  KanbanColumnDragId,
  KanbanDestination,
  KanbanState,
} from "../conversations-types";

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

function normalizeDestinationIndex(
  currentIndex: number,
  destinationIndex: number,
): number {
  return currentIndex < destinationIndex ? destinationIndex - 1 : destinationIndex;
}

function cloneCardLocationsById(
  cardLocationsById: KanbanState["cardLocationsById"],
): KanbanState["cardLocationsById"] {
  const nextLocations: KanbanState["cardLocationsById"] = {};

  for (const [cardId, location] of Object.entries(cardLocationsById)) {
    nextLocations[cardId] = { stage: location.stage, index: location.index };
  }

  return nextLocations;
}

function updateColumnCardLocations(
  cardLocationsById: KanbanState["cardLocationsById"],
  stage: ConversationStage,
  cardIds: KanbanCardId[],
) {
  for (let index = 0; index < cardIds.length; index += 1) {
    const cardId = cardIds[index];
    cardLocationsById[cardId] = { stage, index };
  }
}

export function createCardLocationsById(
  columnCardIds: Record<ConversationStage, KanbanCardId[]>,
): KanbanState["cardLocationsById"] {
  const cardLocationsById: KanbanState["cardLocationsById"] = {};

  for (const stage of KANBAN_STAGES) {
    updateColumnCardLocations(cardLocationsById, stage, columnCardIds[stage]);
  }

  return cardLocationsById;
}

function updateCardStage(
  cardsById: KanbanState["cardsById"],
  cardId: KanbanCardId,
  nextStage: ConversationStage,
): KanbanState["cardsById"] {
  const movedRow = cardsById[cardId];
  if (!movedRow) {
    return cardsById;
  }

  return {
    ...cardsById,
    [cardId]: {
      ...movedRow,
      stage: nextStage,
    },
  };
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
    cardLocationsById: createCardLocationsById(columnCardIds),
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
    cardLocationsById: cloneCardLocationsById(state.cardLocationsById),
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

function parseColumnDragId(
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
  const location = state.cardLocationsById[cardId];
  if (!location) {
    return null;
  }

  return {
    stage: location.stage,
    index: location.index,
  };
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

function moveWithinColumn(
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

  const nextCardLocationsById = { ...state.cardLocationsById };
  updateColumnCardLocations(nextCardLocationsById, stage, nextColumnIds);

  return {
    ...state,
    columnCardIds: {
      ...state.columnCardIds,
      [stage]: nextColumnIds,
    },
    cardLocationsById: nextCardLocationsById,
  };
}

function moveAcrossColumns(
  state: KanbanState,
  cardId: KanbanCardId,
  fromStage: ConversationStage,
  fromIndex: number,
  toStage: ConversationStage,
  toIndex: number,
): KanbanState {
  const sourceIds = state.columnCardIds[fromStage];
  const destinationIds = state.columnCardIds[toStage];
  const normalizedSourceIndex =
    sourceIds[fromIndex] === cardId ? fromIndex : sourceIds.indexOf(cardId);

  if (normalizedSourceIndex < 0) {
    return state;
  }

  const nextSourceIds = [...sourceIds];
  nextSourceIds.splice(normalizedSourceIndex, 1);

  const nextDestinationIds = [...destinationIds];
  const destinationIndex = clampIndex(toIndex, nextDestinationIds.length);
  nextDestinationIds.splice(destinationIndex, 0, cardId);

  const nextCardsById = updateCardStage(state.cardsById, cardId, toStage);
  const nextCardLocationsById = { ...state.cardLocationsById };
  updateColumnCardLocations(nextCardLocationsById, fromStage, nextSourceIds);
  updateColumnCardLocations(nextCardLocationsById, toStage, nextDestinationIds);

  return {
    ...state,
    cardsById: nextCardsById,
    columnCardIds: {
      ...state.columnCardIds,
      [fromStage]: nextSourceIds,
      [toStage]: nextDestinationIds,
    },
    cardLocationsById: nextCardLocationsById,
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
    const nextIndex = normalizeDestinationIndex(
      currentLocation.index,
      destination.index,
    );

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
    currentLocation.index,
    destination.stage,
    destination.index,
  );
}
