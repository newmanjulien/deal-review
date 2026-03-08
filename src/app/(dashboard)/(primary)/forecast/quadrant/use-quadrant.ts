"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { QuadrantPoint, QuadrantPointerContext } from "./quadrant-types";

export function useQuadrant() {
  const [hoveredPoint, setHoveredPoint] = useState<QuadrantPoint | null>(null);
  const [pointerContext, setPointerContext] =
    useState<QuadrantPointerContext | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const pendingPointerRef = useRef<QuadrantPointerContext | null>(null);

  const cancelPendingPointerUpdate = useCallback(() => {
    pendingPointerRef.current = null;

    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = null;
    }
  }, []);

  const flushPendingPointerUpdate = useCallback(() => {
    pointerFrameRef.current = null;

    const nextPointer = pendingPointerRef.current;
    pendingPointerRef.current = null;

    if (nextPointer) {
      setPointerContext(nextPointer);
    }
  }, []);

  const schedulePointerUpdate = useCallback(
    (pointer: QuadrantPointerContext) => {
      pendingPointerRef.current = pointer;

      if (pointerFrameRef.current !== null) {
        return;
      }

      pointerFrameRef.current = window.requestAnimationFrame(() => {
        flushPendingPointerUpdate();
      });
    },
    [flushPendingPointerUpdate],
  );

  const handleSvgMouseLeave = useCallback(() => {
    cancelPendingPointerUpdate();
    setHoveredPoint(null);
    setPointerContext(null);
  }, [cancelPendingPointerUpdate]);

  const handlePointHover = useCallback(
    (point: QuadrantPoint, pointer: QuadrantPointerContext) => {
      cancelPendingPointerUpdate();
      setHoveredPoint(point);
      setPointerContext(pointer);
    },
    [cancelPendingPointerUpdate],
  );

  const handlePointMove = useCallback(
    (pointer: QuadrantPointerContext) => {
      schedulePointerUpdate(pointer);
    },
    [schedulePointerUpdate],
  );

  useEffect(() => cancelPendingPointerUpdate, [cancelPendingPointerUpdate]);

  return {
    hoveredPoint,
    pointerContext,
    handleSvgMouseLeave,
    handlePointHover,
    handlePointMove,
  };
}
