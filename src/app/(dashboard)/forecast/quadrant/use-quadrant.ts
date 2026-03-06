"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { QuadrantChartData, QuadrantPoint } from "./quadrant-types";

type ClientPosition = { x: number; y: number };
type SvgBounds = { left: number; top: number; width: number; height: number };

type UseQuadrantOptions = {
  chart: QuadrantChartData;
  defaultPointId?: string;
};

export function useQuadrant({
  chart,
  defaultPointId = "q18",
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

  const svgRef = useRef<SVGSVGElement | null>(null);
  const svgBoundsRef = useRef<SvgBounds | null>(null);

  const defaultPoint = useMemo(
    () => chart.points.find((point) => point.id === defaultPointId),
    [chart.points, defaultPointId],
  );

  const measureBounds = useCallback(() => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) {
      return null;
    }

    const bounds = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };

    svgBoundsRef.current = bounds;
    return bounds;
  }, []);

  const getBounds = useCallback(
    () => svgBoundsRef.current ?? measureBounds(),
    [measureBounds],
  );

  const resolvePointer = useCallback(
    (clientPosition: ClientPosition) => {
      const bounds = getBounds();
      if (!bounds) {
        return null;
      }

      return {
        position: {
          x: clientPosition.x - bounds.left,
          y: clientPosition.y - bounds.top,
        },
        bounds: {
          width: bounds.width,
          height: bounds.height,
        },
      };
    },
    [getBounds],
  );

  useEffect(() => {
    const invalidateBounds = () => {
      svgBoundsRef.current = null;
    };

    window.addEventListener("resize", invalidateBounds, { passive: true });
    window.addEventListener("scroll", invalidateBounds, { passive: true });

    return () => {
      window.removeEventListener("resize", invalidateBounds);
      window.removeEventListener("scroll", invalidateBounds);
    };
  }, []);

  const handleSvgMouseEnter = useCallback(() => {
    measureBounds();
  }, [measureBounds]);

  const handleSvgMouseMove = useCallback(() => {
    setHasInteracted(true);
  }, []);

  const handleSvgMouseLeave = useCallback(() => {
    svgBoundsRef.current = null;
    setHoveredPoint(null);
    setHoverPosition(null);
    setHoverBounds(null);
  }, []);

  const handlePointHover = useCallback(
    (point: QuadrantPoint, clientPosition: ClientPosition) => {
      const resolved = resolvePointer(clientPosition);
      if (!resolved) {
        return;
      }

      setHasInteracted(true);
      setHoveredPoint(point);
      setHoverPosition(resolved.position);
      setHoverBounds(resolved.bounds);
    },
    [resolvePointer],
  );

  const handlePointMove = useCallback(
    (clientPosition: ClientPosition) => {
      const resolved = resolvePointer(clientPosition);
      if (!resolved) {
        return;
      }

      setHoverPosition(resolved.position);
      setHoverBounds(resolved.bounds);
    },
    [resolvePointer],
  );

  const displayedHoveredPoint =
    hoveredPoint ?? (!hasInteracted ? (defaultPoint ?? null) : null);
  const displayedHoverPosition =
    hoverPosition ??
    (!hasInteracted && defaultPoint
      ? { x: defaultPoint.xPx, y: defaultPoint.yPx }
      : null);
  const displayedHoverBounds =
    hoverBounds ??
    (!hasInteracted && defaultPoint
      ? {
          width: chart.layout.dimensions.width,
          height: chart.layout.dimensions.height,
        }
      : null);

  return {
    refs: {
      svgRef,
    },
    state: {
      displayedHoveredPoint,
      displayedHoverPosition,
      displayedHoverBounds,
    },
    actions: {
      handleSvgMouseEnter,
      handleSvgMouseMove,
      handleSvgMouseLeave,
      handlePointHover,
      handlePointMove,
    },
  };
}
