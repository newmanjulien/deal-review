export type OptionalAppTier = "paid" | "free";

export type OptionalAppId = "reminders" | "call-transcriber" | "rfps";

export type OptionalApp = {
  id: OptionalAppId;
  name: string;
  description: string;
  tier: OptionalAppTier;
};

export const optionalApps: OptionalApp[] = [
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
    name: "RFPs",
    description:
      "Add your RFP, your assistant will help break it down into simple tasks. And delegate tasks to colleagues",
    tier: "paid",
  },
];
