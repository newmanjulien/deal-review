import { normalizeDashboardPathname } from "@/app/(dashboard)/_routes/dashboard-pathname";

type DashboardChromeUiState = {
  pathname: string;
  isDesktopViewport: boolean;
  isSidebarExpanded: boolean;
  isMobileDrawerOpen: boolean;
  openMenuId: string | null;
};

type DashboardChromeUiAction =
  | {
      type: "ROUTE_CHANGED";
      pathname: string;
    }
  | {
      type: "VIEWPORT_CHANGED";
      isDesktopViewport: boolean;
    }
  | {
      type: "TOGGLE_SIDEBAR";
    }
  | {
      type: "SET_SIDEBAR_EXPANDED";
      expanded: boolean;
    }
  | {
      type: "TOGGLE_MOBILE_DRAWER";
    }
  | {
      type: "SET_MOBILE_DRAWER_OPEN";
      open: boolean;
    }
  | {
      type: "SET_MENU_OPEN";
      menuId: string;
      open: boolean;
    };

type DashboardChromeUiStateOptions = {
  pathname?: string;
  isDesktopViewport?: boolean;
};

export function createDashboardChromeUiState(
  options: DashboardChromeUiStateOptions = {},
): DashboardChromeUiState {
  const isDesktopViewport = options.isDesktopViewport ?? false;

  return {
    pathname: normalizeDashboardPathname(options.pathname ?? "/"),
    isDesktopViewport,
    isSidebarExpanded: false,
    isMobileDrawerOpen: false,
    openMenuId: null,
  };
}

export function dashboardChromeUiReducer(
  state: DashboardChromeUiState,
  action: DashboardChromeUiAction,
): DashboardChromeUiState {
  switch (action.type) {
    case "ROUTE_CHANGED": {
      const normalizedPathname = normalizeDashboardPathname(action.pathname);
      return {
        ...state,
        pathname: normalizedPathname,
        isMobileDrawerOpen: false,
        openMenuId: null,
      };
    }

    case "VIEWPORT_CHANGED": {
      if (action.isDesktopViewport === state.isDesktopViewport) {
        return state;
      }

      if (action.isDesktopViewport) {
        return {
          ...state,
          isDesktopViewport: true,
          isMobileDrawerOpen: false,
        };
      }

      return {
        ...state,
        isDesktopViewport: false,
        isSidebarExpanded: false,
      };
    }

    case "TOGGLE_SIDEBAR": {
      return {
        ...state,
        isSidebarExpanded: !state.isSidebarExpanded,
      };
    }

    case "SET_SIDEBAR_EXPANDED": {
      if (action.expanded === state.isSidebarExpanded) {
        return state;
      }

      return {
        ...state,
        isSidebarExpanded: action.expanded,
      };
    }

    case "TOGGLE_MOBILE_DRAWER": {
      const nextOpen = !state.isMobileDrawerOpen;
      return {
        ...state,
        isMobileDrawerOpen: nextOpen,
        openMenuId: nextOpen ? null : state.openMenuId,
      };
    }

    case "SET_MOBILE_DRAWER_OPEN": {
      if (action.open === state.isMobileDrawerOpen) {
        return state;
      }

      return {
        ...state,
        isMobileDrawerOpen: action.open,
        openMenuId: action.open ? null : state.openMenuId,
      };
    }

    case "SET_MENU_OPEN": {
      if (action.open) {
        if (state.openMenuId === action.menuId && !state.isMobileDrawerOpen) {
          return state;
        }

        return {
          ...state,
          openMenuId: action.menuId,
          isMobileDrawerOpen: false,
        };
      }

      if (state.openMenuId !== action.menuId) {
        return state;
      }

      return {
        ...state,
        openMenuId: null,
      };
    }

    default: {
      return state;
    }
  }
}
