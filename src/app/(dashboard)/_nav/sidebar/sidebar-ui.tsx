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

type DashboardSidebarContextValue = {
  isExpanded: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
};

const DashboardSidebarContext = createContext<DashboardSidebarContextValue | null>(
  null,
);

export function DashboardSidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const onMediaQueryChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        setIsExpanded(false);
      }
    };

    mediaQuery.addEventListener("change", onMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", onMediaQueryChange);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsExpanded((current) => !current);
  }, []);

  const collapseSidebar = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const value = useMemo(
    () => ({
      isExpanded,
      toggleSidebar,
      collapseSidebar,
    }),
    [collapseSidebar, isExpanded, toggleSidebar],
  );

  return (
    <DashboardSidebarContext.Provider value={value}>
      {children}
    </DashboardSidebarContext.Provider>
  );
}

export function useDashboardSidebar() {
  const context = useContext(DashboardSidebarContext);
  if (!context) {
    throw new Error(
      "useDashboardSidebar must be used within a DashboardSidebarProvider",
    );
  }
  return context;
}
