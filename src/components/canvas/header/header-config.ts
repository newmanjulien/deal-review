export const CANVAS_HEADER_CONFIG = {
  breadcrumbLabel: "Since last meeting",
} as const;

export const HEADER_MENU_CONFIG = {
  meetingDate: {
    id: "header-dates-popover-content",
    sectionLabel: "Select meeting date",
    triggerSuffix: "meeting",
  },
  sellerSwitch: {
    id: "header-people-popover-content",
    triggerLabel: "Switch",
    sectionLabel: "Switch to another seller",
  },
  share: {
    id: "header-share-menu-content",
    sectionLabel: "Share with a team member",
  },
} as const;
