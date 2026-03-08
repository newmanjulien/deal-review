"use client";

import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import type {
  ConversationStage,
  KanbanCardId,
  KanbanDestination,
  KanbanDragState,
  KanbanPointer,
  KanbanState,
} from "../conversations-types";
import { KANBAN_STAGES } from "./conversations-kanban-constants";
import {
  cloneKanbanState,
  findCardLocation,
  moveCardToDestination,
  parseCardDragId,
  resolveDestinationFromDragId,
  restoreFromSnapshot,
} from "./conversations-kanban-utils";

type SetBoardState = Dispatch<SetStateAction<KanbanState>>;

export type ColumnListRefs = Record<ConversationStage, HTMLOListElement | null>;

type PendingDragOver = {
  cardId: KanbanCardId;
  overId: UniqueIdentifier;
};

export type KanbanDragSessionRuntime = {
  pointer: KanbanPointer | null;
  dragStartPointer: KanbanPointer | null;
  snapshot: KanbanState | null;
  destination: KanbanDestination | null;
  pendingDragOver: PendingDragOver | null;
  dragOverFrameId: number | null;
};

type DragMachineState =
  | {
      phase: "idle";
      activeDrag: null;
    }
  | {
      phase: "dragging";
      activeDrag: KanbanDragState;
    };

type DragMachineAction =
  | {
      type: "DRAG_STARTED";
      activeDrag: KanbanDragState;
    }
  | {
      type: "DRAG_FINISHED";
    };

type UseKanbanDragStateOptions = {
  boardState: KanbanState;
  setBoardState: SetBoardState;
  onBoardCommit?: (nextBoardState: KanbanState) => void;
};

function createEmptyColumnListRefs(): ColumnListRefs {
  return Object.fromEntries(KANBAN_STAGES.map((stage) => [stage, null])) as ColumnListRefs;
}

function createDragSessionRuntime(): KanbanDragSessionRuntime {
  return {
    pointer: null,
    dragStartPointer: null,
    snapshot: null,
    destination: null,
    pendingDragOver: null,
    dragOverFrameId: null,
  };
}

function reduceDragMachineState(
  state: DragMachineState,
  action: DragMachineAction,
): DragMachineState {
  switch (state.phase) {
    case "idle": {
      if (action.type === "DRAG_STARTED") {
        return {
          phase: "dragging",
          activeDrag: action.activeDrag,
        };
      }

      return state;
    }

    case "dragging": {
      if (action.type === "DRAG_FINISHED") {
        return {
          phase: "idle",
          activeDrag: null,
        };
      }

      if (action.type === "DRAG_STARTED") {
        return {
          phase: "dragging",
          activeDrag: action.activeDrag,
        };
      }

      return state;
    }
  }
}

function getPointerFromActivatorEvent(
  event: Event | null | undefined,
): KanbanPointer | null {
  if (!event) {
    return null;
  }

  if (
    (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) ||
    (typeof MouseEvent !== "undefined" && event instanceof MouseEvent)
  ) {
    return { x: event.clientX, y: event.clientY };
  }

  if (typeof TouchEvent !== "undefined" && event instanceof TouchEvent) {
    const touch = event.touches[0] ?? event.changedTouches[0];
    if (!touch) {
      return null;
    }

    return { x: touch.clientX, y: touch.clientY };
  }

  return null;
}

function isSameDestination(
  previous: KanbanDestination | null,
  next: KanbanDestination,
): boolean {
  return Boolean(
    previous &&
      previous.stage === next.stage &&
      previous.index === next.index,
  );
}

function computeDragOverBoardState(
  currentState: KanbanState,
  cardId: KanbanCardId,
  overId: UniqueIdentifier,
  previousDestination: KanbanDestination | null,
): {
  nextState: KanbanState;
  nextDestination: KanbanDestination | null;
} {
  const destination = resolveDestinationFromDragId(currentState, overId);
  if (!destination || isSameDestination(previousDestination, destination)) {
    return {
      nextState: currentState,
      nextDestination: previousDestination,
    };
  }

  return {
    nextState: moveCardToDestination(currentState, cardId, destination),
    nextDestination: destination,
  };
}

export function useKanbanDragState({
  boardState,
  setBoardState,
  onBoardCommit,
}: UseKanbanDragStateOptions) {
  const [dragMachineState, dispatchDragMachine] = useReducer(
    reduceDragMachineState,
    {
      phase: "idle",
      activeDrag: null,
    } as DragMachineState,
  );
  const dragSessionRef = useRef<KanbanDragSessionRuntime>(createDragSessionRuntime());
  const columnListRefsRef = useRef(createEmptyColumnListRefs());

  const commitBoardState = useCallback(
    (nextBoardState: KanbanState): KanbanState => {
      onBoardCommit?.(nextBoardState);
      return nextBoardState;
    },
    [onBoardCommit],
  );

  const clearScheduledDragOver = useCallback(() => {
    const dragSession = dragSessionRef.current;
    dragSession.pendingDragOver = null;

    if (dragSession.dragOverFrameId !== null) {
      window.cancelAnimationFrame(dragSession.dragOverFrameId);
      dragSession.dragOverFrameId = null;
    }
  }, []);

  const clearDragState = useCallback(() => {
    clearScheduledDragOver();

    const dragSession = dragSessionRef.current;
    dragSession.snapshot = null;
    dragSession.destination = null;
    dragSession.dragStartPointer = null;
    dragSession.pointer = null;

    dispatchDragMachine({ type: "DRAG_FINISHED" });
  }, [clearScheduledDragOver]);

  const restoreDragSnapshot = useCallback(() => {
    setBoardState((currentState) =>
      commitBoardState(restoreFromSnapshot(dragSessionRef.current.snapshot, currentState)),
    );
  }, [commitBoardState, setBoardState]);

  const flushPendingDragOver = useCallback(() => {
    const dragSession = dragSessionRef.current;
    dragSession.dragOverFrameId = null;

    const pendingDragOver = dragSession.pendingDragOver;
    dragSession.pendingDragOver = null;
    if (!pendingDragOver) {
      return;
    }

    setBoardState((currentState) => {
      const { nextState, nextDestination } = computeDragOverBoardState(
        currentState,
        pendingDragOver.cardId,
        pendingDragOver.overId,
        dragSession.destination,
      );

      dragSession.destination = nextDestination;
      return nextState;
    });
  }, [setBoardState]);

  const scheduleDragOverUpdate = useCallback(() => {
    const dragSession = dragSessionRef.current;
    if (dragSession.dragOverFrameId !== null) {
      return;
    }

    dragSession.dragOverFrameId = window.requestAnimationFrame(flushPendingDragOver);
  }, [flushPendingDragOver]);

  const handleDragStart = useCallback(
    ({ active, activatorEvent }: DragStartEvent) => {
      const cardId = parseCardDragId(active.id);
      if (!cardId) {
        return;
      }

      const currentLocation = findCardLocation(boardState, cardId);
      if (!currentLocation) {
        return;
      }

      const dragSession = dragSessionRef.current;
      dragSession.snapshot = cloneKanbanState(boardState);
      dragSession.destination = currentLocation;

      const pointer = getPointerFromActivatorEvent(activatorEvent);
      dragSession.dragStartPointer = pointer;
      dragSession.pointer = pointer;

      dispatchDragMachine({
        type: "DRAG_STARTED",
        activeDrag: {
          cardId,
          originStage: currentLocation.stage,
          originIndex: currentLocation.index,
        },
      });
    },
    [boardState],
  );

  const handleDragMove = useCallback(({ delta }: DragMoveEvent) => {
    const dragSession = dragSessionRef.current;
    const startPointer = dragSession.dragStartPointer;
    if (!startPointer) {
      return;
    }

    dragSession.pointer = {
      x: startPointer.x + delta.x,
      y: startPointer.y + delta.y,
    };
  }, []);

  const handleDragOver = useCallback(
    ({ active, over }: DragOverEvent) => {
      if (!over) {
        return;
      }

      const cardId = parseCardDragId(active.id);
      if (!cardId) {
        return;
      }

      dragSessionRef.current.pendingDragOver = {
        cardId,
        overId: over.id,
      };
      scheduleDragOverUpdate();
    },
    [scheduleDragOverUpdate],
  );

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      clearScheduledDragOver();

      const cardId = parseCardDragId(active.id);
      if (!cardId) {
        clearDragState();
        return;
      }

      if (!over) {
        restoreDragSnapshot();
        clearDragState();
        return;
      }

      setBoardState((currentState) => {
        const destination =
          resolveDestinationFromDragId(currentState, over.id) ??
          dragSessionRef.current.destination;
        const nextState = destination
          ? moveCardToDestination(currentState, cardId, destination)
          : restoreFromSnapshot(dragSessionRef.current.snapshot, currentState);

        return commitBoardState(nextState);
      });

      clearDragState();
    },
    [
      clearDragState,
      clearScheduledDragOver,
      commitBoardState,
      restoreDragSnapshot,
      setBoardState,
    ],
  );

  const handleDragCancel = useCallback(() => {
    restoreDragSnapshot();
    clearDragState();
  }, [clearDragState, restoreDragSnapshot]);

  useEffect(() => clearScheduledDragOver, [clearScheduledDragOver]);

  return {
    activeDrag: dragMachineState.activeDrag,
    dragSessionRef,
    columnListRefsRef,
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
}
