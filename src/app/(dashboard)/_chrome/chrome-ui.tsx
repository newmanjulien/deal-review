"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
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

type DashboardChromeUiState = ReturnType<typeof createDashboardChromeUiState>;
type DashboardChromeUiAction = Parameters<typeof dashboardChromeUiReducer>[1];

type DashboardChromeUiActions = {
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
  collapseSidebar: () => void;
  toggleMobileDrawer: () => void;
  setMobileDrawerOpen: (open: boolean) => void;
  setMenuOpen: (menuId: string, open: boolean) => void;
  isMenuOpen: (menuId: string) => boolean;
};

type DashboardChromeUiContextValue = {
  state: DashboardChromeUiState;
  actions: DashboardChromeUiActions;
};

const DashboardChromeUiContext =
  createContext<DashboardChromeUiContextValue | null>(null);
const DashboardChromeModelContext = createContext<
  DashboardChromeModel | null | undefined
>(undefined);

function useViewportSync(dispatch: Dispatch<DashboardChromeUiAction>) {
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
  }, [dispatch]);
}

function useDashboardChromeActions(
  dispatch: Dispatch<DashboardChromeUiAction>,
  openMenuId: DashboardChromeUiState["openMenuId"],
): DashboardChromeUiActions {
  return useMemo(
    () => ({
      toggleSidebar: () => dispatch({ type: "TOGGLE_SIDEBAR" }),
      setSidebarExpanded: (expanded: boolean) =>
        dispatch({ type: "SET_SIDEBAR_EXPANDED", expanded }),
      collapseSidebar: () =>
        dispatch({ type: "SET_SIDEBAR_EXPANDED", expanded: false }),
      toggleMobileDrawer: () => dispatch({ type: "TOGGLE_MOBILE_DRAWER" }),
      setMobileDrawerOpen: (open: boolean) =>
        dispatch({ type: "SET_MOBILE_DRAWER_OPEN", open }),
      setMenuOpen: (menuId: string, open: boolean) =>
        dispatch({ type: "SET_MENU_OPEN", menuId, open }),
      isMenuOpen: (menuId: string) => openMenuId === menuId,
    }),
    [dispatch, openMenuId],
  );
}

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
  }, [dispatch, normalizedPathname]);

  useViewportSync(dispatch);

  const chrome = useMemo(() => resolveDashboardChrome(normalizedPathname), [
    normalizedPathname,
  ]);
  const actions = useDashboardChromeActions(dispatch, state.openMenuId);
  const uiValue = useMemo(() => ({ state, actions }), [actions, state]);

  return (
    <DashboardChromeModelContext.Provider value={chrome}>
      <DashboardChromeUiContext.Provider value={uiValue}>
        {children}
      </DashboardChromeUiContext.Provider>
    </DashboardChromeModelContext.Provider>
  );
}

export function useDashboardChromeUi() {
  const context = useContext(DashboardChromeUiContext);

  if (!context) {
    throw new Error("useDashboardChromeUi must be used within a DashboardChromeProvider");
  }

  return context;
}

export function useDashboardChromeModel() {
  const context = useContext(DashboardChromeModelContext);

  if (context === undefined) {
    throw new Error(
      "useDashboardChromeModel must be used within a DashboardChromeProvider",
    );
  }

  return context;
}
