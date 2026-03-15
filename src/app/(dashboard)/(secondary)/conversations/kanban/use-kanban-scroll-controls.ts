"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import {
  SCROLL_EDGE_EPSILON_PX,
} from "./conversations-kanban-constants";

type UseKanbanScrollControlsOptions = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

export function useKanbanScrollControls({
  scrollContainerRef,
}: UseKanbanScrollControlsOptions) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const updateFrameRef = useRef<number | null>(null);
  const latestScrollStateRef = useRef({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const commitScrollState = useCallback(() => {
    const element = scrollContainerRef.current;
    if (!element) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = element;
    const nextState = {
      canScrollLeft: scrollLeft > SCROLL_EDGE_EPSILON_PX,
      canScrollRight:
        scrollLeft + clientWidth < scrollWidth - SCROLL_EDGE_EPSILON_PX,
    };

    if (nextState.canScrollLeft !== latestScrollStateRef.current.canScrollLeft) {
      setCanScrollLeft(nextState.canScrollLeft);
    }

    if (nextState.canScrollRight !== latestScrollStateRef.current.canScrollRight) {
      setCanScrollRight(nextState.canScrollRight);
    }

    latestScrollStateRef.current = nextState;
  }, [scrollContainerRef]);

  const updateScrollState = useCallback(() => {
    if (updateFrameRef.current !== null) {
      return;
    }

    updateFrameRef.current = window.requestAnimationFrame(() => {
      updateFrameRef.current = null;
      commitScrollState();
    });
  }, [commitScrollState]);

  const updateScrollStateNow = useCallback(() => {
    if (updateFrameRef.current !== null) {
      window.cancelAnimationFrame(updateFrameRef.current);
      updateFrameRef.current = null;
    }

    commitScrollState();
  }, [commitScrollState]);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) {
      return;
    }

    updateScrollStateNow();
    const handleResize = () => updateScrollState();

    element.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollContainerRef, updateScrollState, updateScrollStateNow]);

  useEffect(() => {
    return () => {
      if (updateFrameRef.current !== null) {
        window.cancelAnimationFrame(updateFrameRef.current);
      }
    };
  }, []);

  return {
    canScrollLeft,
    canScrollRight,
    updateScrollState,
  };
}
