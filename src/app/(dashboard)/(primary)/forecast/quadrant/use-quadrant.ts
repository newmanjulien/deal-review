"use client";

import { useCallback, useMemo, useState } from "react";
import { QUADRANT_BEHAVIOR_CONFIG } from "./quadrant-config";
import type {
  QuadrantChartData,
  QuadrantPoint,
  QuadrantPointerContext,
} from "./quadrant-types";

type UseQuadrantOptions = {
  chart: QuadrantChartData;
  defaultPointId?: string;
};

export function useQuadrant({
  chart,
  defaultPointId = QUADRANT_BEHAVIOR_CONFIG.defaultPointId,
}: UseQuadrantOptions) {
  const [hoveredPoint, setHoveredPoint] = useState<QuadrantPoint | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [hoverBounds, setHoverBounds] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const defaultPoint = useMemo(
    () => chart.points.find((point) => point.id === defaultPointId),
    [chart.points, defaultPointId],
  );

  const handleSvgMouseMove = useCallback(() => {
    setHasInteracted(true);
  }, []);

  const handleSvgMouseLeave = useCallback(() => {
    setHoveredPoint(null);
    setHoverPosition(null);
    setHoverBounds(null);
  }, []);

  const handlePointHover = useCallback(
    (point: QuadrantPoint, pointer: QuadrantPointerContext) => {
      setHasInteracted(true);
      setHoveredPoint(point);
      setHoverPosition({ x: pointer.x, y: pointer.y });
      setHoverBounds({ width: pointer.width, height: pointer.height });
    },
    [],
  );

  const handlePointMove = useCallback(
    (pointer: QuadrantPointerContext) => {
      setHoverPosition({ x: pointer.x, y: pointer.y });
      setHoverBounds({ width: pointer.width, height: pointer.height });
    },
    [],
  );

  const defaultHoverState =
    !hasInteracted && defaultPoint
      ? {
          point: defaultPoint,
          position: { x: defaultPoint.xPx, y: defaultPoint.yPx },
          bounds: {
            width: chart.layout.dimensions.width,
            height: chart.layout.dimensions.height,
          },
        }
      : null;

  const displayedHoveredPoint = hoveredPoint ?? defaultHoverState?.point ?? null;
  const displayedHoverPosition = hoverPosition ?? defaultHoverState?.position ?? null;
  const displayedHoverBounds = hoverBounds ?? defaultHoverState?.bounds ?? null;

  return {
    displayedHoveredPoint,
    displayedHoverPosition,
    displayedHoverBounds,
    handleSvgMouseMove,
    handleSvgMouseLeave,
    handlePointHover,
    handlePointMove,
  };
}
