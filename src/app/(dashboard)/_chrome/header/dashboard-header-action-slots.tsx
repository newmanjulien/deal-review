"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const DASHBOARD_HEADER_ACTION_SLOTS = {
  desktopLeadingAfterTitle: "desktop-leading-after-title",
  desktopTrailingBeforeOverflow: "desktop-trailing-before-overflow",
} as const;

export type DashboardHeaderActionSlotName =
  (typeof DASHBOARD_HEADER_ACTION_SLOTS)[keyof typeof DASHBOARD_HEADER_ACTION_SLOTS];

type DashboardHeaderActionSlotsContextValue = {
  hosts: Partial<Record<DashboardHeaderActionSlotName, HTMLElement | null>>;
  contentCounts: Partial<Record<DashboardHeaderActionSlotName, number>>;
  registerHost: (
    slot: DashboardHeaderActionSlotName,
    element: HTMLElement | null,
  ) => void;
  updateContentCount: (
    slot: DashboardHeaderActionSlotName,
    delta: 1 | -1,
  ) => void;
};

const DashboardHeaderActionSlotsContext =
  createContext<DashboardHeaderActionSlotsContextValue | null>(null);

function useDashboardHeaderActionSlots() {
  const context = useContext(DashboardHeaderActionSlotsContext);

  if (!context) {
    throw new Error(
      "Dashboard header action slots must be used within a DashboardHeaderActionSlotsProvider",
    );
  }

  return context;
}

export function DashboardHeaderActionSlotsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hosts, setHosts] = useState<
    Partial<Record<DashboardHeaderActionSlotName, HTMLElement | null>>
  >({});
  const [contentCounts, setContentCounts] = useState<
    Partial<Record<DashboardHeaderActionSlotName, number>>
  >({});

  const registerHost = useCallback(
    (slot: DashboardHeaderActionSlotName, element: HTMLElement | null) => {
      setHosts((currentHosts) => {
        if (currentHosts[slot] === element) {
          return currentHosts;
        }

        return {
          ...currentHosts,
          [slot]: element,
        };
      });
    },
    [],
  );

  const updateContentCount = useCallback(
    (slot: DashboardHeaderActionSlotName, delta: 1 | -1) => {
      setContentCounts((currentCounts) => {
        const currentCount = currentCounts[slot] ?? 0;
        const nextCount = Math.max(0, currentCount + delta);

        if (nextCount === currentCount) {
          return currentCounts;
        }

        if (nextCount === 0) {
          const remainingCounts = { ...currentCounts };
          delete remainingCounts[slot];
          return remainingCounts;
        }

        return {
          ...currentCounts,
          [slot]: nextCount,
        };
      });
    },
    [],
  );

  const value = useMemo(
    () => ({
      hosts,
      contentCounts,
      registerHost,
      updateContentCount,
    }),
    [contentCounts, hosts, registerHost, updateContentCount],
  );

  return (
    <DashboardHeaderActionSlotsContext.Provider value={value}>
      {children}
    </DashboardHeaderActionSlotsContext.Provider>
  );
}

export function DashboardHeaderActionHost({
  slot,
  className,
}: {
  slot: DashboardHeaderActionSlotName;
  className?: string;
}) {
  const { registerHost, contentCounts } = useDashboardHeaderActionSlots();
  const isPopulated = (contentCounts[slot] ?? 0) > 0;
  const setHostRef = useCallback(
    (element: HTMLDivElement | null) => {
      registerHost(slot, element);
    },
    [registerHost, slot],
  );

  if (slot === DASHBOARD_HEADER_ACTION_SLOTS.desktopLeadingAfterTitle) {
    return (
      <div
        className={cn(
          "hidden shrink-0 items-center",
          isPopulated && "flex",
          className,
        )}
      >
        <ChevronRight className="mr-2 h-3 w-3 text-zinc-200" />
        <div ref={setHostRef} className="flex items-center gap-2" />
      </div>
    );
  }

  return (
    <div
      ref={setHostRef}
      className={cn(
        "hidden items-center gap-2",
        isPopulated && "mr-2 flex",
        className,
      )}
    />
  );
}

export function DashboardHeaderActionPortal({
  slot,
  children,
}: {
  slot: DashboardHeaderActionSlotName;
  children: ReactNode;
}) {
  const { hosts, updateContentCount } = useDashboardHeaderActionSlots();
  const host = hosts[slot];

  useEffect(() => {
    updateContentCount(slot, 1);

    return () => {
      updateContentCount(slot, -1);
    };
  }, [slot, updateContentCount]);

  if (typeof document === "undefined" || !host) {
    return null;
  }

  return createPortal(children, host);
}
