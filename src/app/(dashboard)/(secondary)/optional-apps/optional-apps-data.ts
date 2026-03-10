export type OptionalAppTier = "free" | "paid";

export type OptionalAppId =
  | "reminders"
  | "call-transcriber"
  | "rfps"
  | "email"
  | "proposals";

export type OptionalApp = {
  id: OptionalAppId;
  name: string;
  description: string;
  tier: OptionalAppTier;
};

const appRecords: OptionalApp[] = [
  {
    id: "reminders",
    name: "Reminders",
    description:
      "Send a text message to your assistant when you want to remember to do something later. Then get a digest every morning with the tasks you need to do",
    tier: "free",
  },
  {
    id: "call-transcriber",
    name: "Call transcriber",
    description:
      "Add to a 3-way phone call. Then you will receive a transcript of the conversation by email after the call ends",
    tier: "free",
  },
  {
    id: "rfps",
    name: "RFP helper",
    description:
      "Add your RFP, your assistant will help break it down into simple tasks. And delegate tasks to colleagues",
    tier: "paid",
  },
  {
    id: "proposals",
    name: "Proposal generator",
    description:
      "Easily and quickly create quality proposals for potential clients. And get them approved in a simple way",
    tier: "paid",
  },
  {
    id: "email",
    name: "1 email per day",
    description:
      "Start long term relationships by send 1 email per day to potential clients in your industry who you don't know yet",
    tier: "paid",
  },
];

const appsByTier: Record<OptionalAppTier, OptionalApp[]> = {
  free: appRecords.filter((app) => app.tier === "free"),
  paid: appRecords.filter((app) => app.tier === "paid"),
};

function getAppById(appId: OptionalAppId): OptionalApp | null {
  return appRecords.find((app) => app.id === appId) ?? null;
}

export const optionalAppsData = {
  records: {
    apps: appRecords,
  },
  views: {
    apps: appRecords,
    appsByTier,
  },
  queries: {
    getAppById,
  },
} as const;
