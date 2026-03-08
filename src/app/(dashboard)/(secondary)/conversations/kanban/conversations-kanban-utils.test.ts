import assert from "node:assert/strict";
import test from "node:test";
import type { ConversationRow } from "../conversations-types";
import {
  cloneKanbanState,
  createKanbanState,
  moveAcrossColumns,
  moveWithinColumn,
  restoreFromSnapshot,
} from "./conversations-kanban-utils";

const testRows: ConversationRow[] = [
  {
    id: "discovery-1",
    company: "Acme",
    contact: "Ava",
    topic: "Discovery call",
    owner: "Julien",
    stage: "Discovery",
    lastUpdate: "1h ago",
  },
  {
    id: "discovery-2",
    company: "Bravo",
    contact: "Ben",
    topic: "Scope confirmation",
    owner: "Sam",
    stage: "Discovery",
    lastUpdate: "2h ago",
  },
  {
    id: "proposal-1",
    company: "Core",
    contact: "Cora",
    topic: "Pricing proposal",
    owner: "Ari",
    stage: "Proposal",
    lastUpdate: "Yesterday",
  },
];

test("createKanbanState partitions cards by stage", () => {
  const state = createKanbanState(testRows);

  assert.equal(Object.keys(state.cardsById).length, testRows.length);
  assert.deepEqual(state.columnCardIds.Discovery, ["discovery-1", "discovery-2"]);
  assert.deepEqual(state.columnCardIds.Proposal, ["proposal-1"]);
  assert.deepEqual(state.columnCardIds.Negotiation, []);
});

test("moveWithinColumn reorders only the requested column", () => {
  const state = createKanbanState(testRows);
  const nextState = moveWithinColumn(state, "Discovery", 0, 1);

  assert.deepEqual(nextState.columnCardIds.Discovery, ["discovery-2", "discovery-1"]);
  assert.deepEqual(nextState.columnCardIds.Proposal, ["proposal-1"]);
});

test("moveAcrossColumns removes from source and inserts into destination index", () => {
  const state = createKanbanState(testRows);
  const nextState = moveAcrossColumns(
    state,
    "discovery-1",
    "Discovery",
    "Proposal",
    1,
  );

  assert.deepEqual(nextState.columnCardIds.Discovery, ["discovery-2"]);
  assert.deepEqual(nextState.columnCardIds.Proposal, ["proposal-1", "discovery-1"]);
});

test("restoreFromSnapshot recreates pre-drag state", () => {
  const state = createKanbanState(testRows);
  const snapshot = cloneKanbanState(state);
  const movedState = moveAcrossColumns(
    state,
    "discovery-2",
    "Discovery",
    "Proposal",
    0,
  );
  const restored = restoreFromSnapshot(snapshot, movedState);

  assert.deepEqual(restored.columnCardIds, snapshot.columnCardIds);
});
