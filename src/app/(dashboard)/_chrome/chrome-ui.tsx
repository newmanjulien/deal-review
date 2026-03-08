"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  createDashboardChromeUiState,
  dashboardChromeUiReducer,
} from "@/app/(dashboard)/_chrome/chrome-ui-reducer";
import { normalizeDashboardPathname } from "@/app/(dashboard)/_routes/dashboard-pathname";
import {
  resolveDashboardChrome,
  type DashboardChromeModel,
} from "@/app/(dashboard)/_routes/dashboard-routes";

type DashboardChromeContextValue = {
  chrome: DashboardChromeModel | null;
  state: {
    pathname: string;
    isDesktopViewport: boolean;
    isSidebarExpanded: boolean;
    isMobileDrawerOpen: boolean;
    openMenuId: string | null;
  };
  actions: {
    toggleSidebar: () => void;
    setSidebarExpanded: (expanded: boolean) => void;
    collapseSidebar: () => void;
    toggleMobileDrawer: () => void;
    setMobileDrawerOpen: (open: boolean) => void;
    setMenuOpen: (menuId: string, open: boolean) => void;
    isMenuOpen: (menuId: string) => boolean;
  };
};

const DashboardChromeContext = createContext<DashboardChromeContextValue | null>(
  null,
);

export function DashboardChromeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const normalizedPathname = normalizeDashboardPathname(pathname);

  const [state, dispatch] = useReducer(
    dashboardChromeUiReducer,
    normalizedPathname,
    (initialPathname) => createDashboardChromeUiState({ pathname: initialPathname }),
  );

  useEffect(() => {
    dispatch({
      type: "ROUTE_CHANGED",
      pathname: normalizedPathname,
    });
  }, [normalizedPathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncViewport = (matches: boolean) => {
      dispatch({
        type: "VIEWPORT_CHANGED",
        isDesktopViewport: matches,
      });
    };

    syncViewport(mediaQuery.matches);

    const onMediaQueryChange = (event: MediaQueryListEvent) => {
      syncViewport(event.matches);
    };

    mediaQuery.addEventListener("change", onMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", onMediaQueryChange);
  }, []);

  const chrome = useMemo(() => resolveDashboardChrome(normalizedPathname), [
    normalizedPathname,
  ]);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  }, []);

  const setSidebarExpanded = useCallback((expanded: boolean) => {
    dispatch({ type: "SET_SIDEBAR_EXPANDED", expanded });
  }, []);

  const collapseSidebar = useCallback(() => {
    dispatch({ type: "SET_SIDEBAR_EXPANDED", expanded: false });
  }, []);

  const toggleMobileDrawer = useCallback(() => {
    dispatch({ type: "TOGGLE_MOBILE_DRAWER" });
  }, []);

  const setMobileDrawerOpen = useCallback((open: boolean) => {
    dispatch({ type: "SET_MOBILE_DRAWER_OPEN", open });
  }, []);

  const setMenuOpen = useCallback((menuId: string, open: boolean) => {
    dispatch({ type: "SET_MENU_OPEN", menuId, open });
  }, []);

  const isMenuOpen = useCallback(
    (menuId: string) => state.openMenuId === menuId,
    [state.openMenuId],
  );

  const value = useMemo(
    () => ({
      chrome,
      state,
      actions: {
        toggleSidebar,
        setSidebarExpanded,
        collapseSidebar,
        toggleMobileDrawer,
        setMobileDrawerOpen,
        setMenuOpen,
        isMenuOpen,
      },
    }),
    [
      chrome,
      isMenuOpen,
      setMenuOpen,
      setMobileDrawerOpen,
      setSidebarExpanded,
      state,
      toggleMobileDrawer,
      toggleSidebar,
      collapseSidebar,
    ],
  );

  return (
    <DashboardChromeContext.Provider value={value}>
      {children}
    </DashboardChromeContext.Provider>
  );
}

export function useDashboardChromeUi() {
  const context = useContext(DashboardChromeContext);

  if (!context) {
    throw new Error("useDashboardChromeUi must be used within a DashboardChromeProvider");
  }

  return context;
}

export function useDashboardChromeModel() {
  return useDashboardChromeUi().chrome;
}
