import type { DataDisplayTimelineItem } from "@/app/(dashboard)/(primary)/_shared/data-display-types";
import type { HeaderPerson } from "@/components/canvas/canvas-types";
import type {
  SinceLastMeetingTableColumn,
  SinceLastMeetingTableRow,
} from "./last-meeting-types";

export const lastMeetingSharedPeople: HeaderPerson[] = [
  {
    name: "Julien Newman",
    avatar: "/avatars/aditya.jpg",
  },
  {
    name: "Yash Patel",
    avatar: "/avatars/yash.webp",
  },
];

export const lastMeetingTimelineItems: DataDisplayTimelineItem[] = [
  {
    id: "tyson",
    title: "2nd meeting with Tyson Foods",
    date: "Jan 13",
    body: "Julien coordinated the 2nd meeting, aligned stakeholders on a refreshed proposal, and walked Tyson through pricing, implementation, and timeline. They captured objections live and left the call with clear next steps and owners.",
  },
  {
    id: "whirlpool",
    title: "1:1 with Whirlpool's CFO",
    date: "Jan 25",
    body: "Julien completed a dedicated 1:1 with the CFO, presented the ROI case and risk mitigation plan, and addressed budget/timing questions. They confirmed approval criteria and the internal path to a decision.",
  },
  {
    id: "3m",
    title: "Legal signoff from 3M",
    date: "Jan 26",
    body: "Julien drove the contract through legal by coordinating redlines, resolving liability and security terms, and keeping both counsels moving on deadlines. Legal signoff was secured, clearing the deal to proceed.",
  },
] as const;

export const lastMeetingTableColumns: SinceLastMeetingTableColumn[] = [
  {
    key: "deal",
    label: "Deal",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wide text-zinc-900",
  },
  {
    key: "probability",
    label: "Probability",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600",
  },
  {
    key: "stage",
    label: "Stage",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-500",
  },
] as const;

export const lastMeetingTableRows: SinceLastMeetingTableRow[] = [
  {
    id: "whirlpool",
    deal: "Whirlpool deal",
    probability: "25% likely to close",
    stage: "Discovery stage",
  },
  {
    id: "tyson",
    deal: "Tyson Foods deal",
    probability: "85% likely to close",
    stage: "Proposal stage",
  },
  {
    id: "3m",
    deal: "3M deal",
    probability: "85% likely to close",
    stage: "Proposal stage",
  },
] as const;
