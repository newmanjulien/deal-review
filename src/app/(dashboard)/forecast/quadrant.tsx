"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QuadrantAxes } from "./quadrant-axes";
import { QuadrantPoints } from "./quadrant-points";
import { QuadrantTooltip } from "./quadrant-tooltip";
import type { QuadrantChartData, QuadrantPoint } from "./types";

type ClientPosition = { x: number; y: number };
type SvgBounds = { left: number; top: number; width: number; height: number };

export function Quadrant({ chart }: { chart: QuadrantChartData }) {
  const [hoveredPoint, setHoveredPoint] = useState<QuadrantPoint | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [hoverBounds, setHoverBounds] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svgBoundsRef = useRef<SvgBounds | null>(null);

  const defaultPoint = chart.points.find((point) => point.id === "q18");

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

  const displayedHoveredPoint = hoveredPoint ?? (!hasInteracted ? defaultPoint ?? null : null);
  const displayedHoverPosition =
    hoverPosition ?? (!hasInteracted && defaultPoint ? { x: defaultPoint.xPx, y: defaultPoint.yPx } : null);
  const displayedHoverBounds =
    hoverBounds ??
    (!hasInteracted && defaultPoint
      ? {
          width: chart.layout.dimensions.width,
          height: chart.layout.dimensions.height,
        }
      : null);

  return (
    <div className="relative w-full rounded-sm border border-zinc-100 bg-white p-3 sm:p-4">
      <svg
        ref={svgRef}
        width={chart.layout.dimensions.width}
        height={chart.layout.dimensions.height}
        viewBox={`0 0 ${chart.layout.dimensions.width} ${chart.layout.dimensions.height}`}
        className="h-auto w-full text-zinc-400"
        onMouseEnter={() => {
          measureBounds();
        }}
        onMouseMove={() => {
          if (!hasInteracted) {
            setHasInteracted(true);
          }
        }}
        onMouseLeave={() => {
          svgBoundsRef.current = null;
          setHoveredPoint(null);
          setHoverPosition(null);
          setHoverBounds(null);
        }}
      >
        <QuadrantAxes chart={chart} layout={chart.layout} />
        <QuadrantPoints
          points={chart.points}
          onHover={(point, clientPosition) => {
            const resolved = resolvePointer(clientPosition);
            if (!resolved) {
              return;
            }

            if (!hasInteracted) {
              setHasInteracted(true);
            }

            setHoveredPoint(point);
            setHoverPosition(resolved.position);
            setHoverBounds(resolved.bounds);
          }}
          onMove={(clientPosition) => {
            const resolved = resolvePointer(clientPosition);
            if (!resolved) {
              return;
            }

            setHoverPosition(resolved.position);
            setHoverBounds(resolved.bounds);
          }}
        />
      </svg>

      <QuadrantTooltip
        hoveredPoint={displayedHoveredPoint}
        hoverPosition={displayedHoverPosition}
        hoverBounds={displayedHoverBounds}
        disagreeThreshold={chart.disagreeThreshold}
      />
    </div>
  );
}
