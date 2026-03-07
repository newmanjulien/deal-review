"use client";

import { useCallback, useState } from "react";
import type { QuadrantPoint, QuadrantPointerContext } from "./quadrant-types";

export function useQuadrant() {
  const [hoveredPoint, setHoveredPoint] = useState<QuadrantPoint | null>(null);
  const [pointerContext, setPointerContext] =
    useState<QuadrantPointerContext | null>(null);

  const handleSvgMouseLeave = useCallback(() => {
    setHoveredPoint(null);
    setPointerContext(null);
  }, []);

  const handlePointHover = useCallback(
    (point: QuadrantPoint, pointer: QuadrantPointerContext) => {
      setHoveredPoint(point);
      setPointerContext(pointer);
    },
    [],
  );

  const handlePointMove = useCallback(
    (pointer: QuadrantPointerContext) => {
      setPointerContext(pointer);
    },
    [],
  );

  return {
    hoveredPoint,
    pointerContext,
    handleSvgMouseLeave,
    handlePointHover,
    handlePointMove,
  };
}
