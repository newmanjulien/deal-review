import {
  buildQuadrantLayout,
  projectQuadrantPoints,
} from "./quadrant-utils";
import type { QuadrantChartData, QuadrantPointSeed } from "./quadrant-types";

const CHART_DIMENSIONS = {
  width: 720,
  height: 520,
};

const CHART_PADDING = {
  top: 28,
  right: 24,
  bottom: 64,
  left: 72,
};

const AXIS_LABEL_OFFSET = {
  x: 50,
  y: 36,
};

const DISAGREE_THRESHOLD = 6;
const xMid = 50;
const yMid = 50;

const basePoints: QuadrantPointSeed[] = [
  {
    id: "q1",
    label: "Caterpillar",
    x: 88,
    y: 90,
    description:
      "Redlines are in flight and getting resolved. The buyer confirmed who signs and what procurement needs. There is a dated close plan with owners.",
  },
  {
    id: "q2",
    label: "Sherwin-Williams",
    x: 68,
    y: 82,
    description:
      "The economic buyer confirmed budget in email. Procurement started vendor setup and shared a timeline. Security is marked complete with no blockers.",
  },
  {
    id: "q3",
    label: "Whirlpool",
    x: 78,
    y: 62,
    description:
      "Calls turned defensive and they asked for concessions before agreeing to a next step. The champion stopped replying after the pricing doc. A competitor was added to the next eval call.",
  },
  {
    id: "q4",
    label: "John Deere",
    x: 58,
    y: 90,
    description:
      "Legal returned a marked-up agreement with targeted edits. The CFO asked rollout and success questions for sign-off. Kickoff is already penciled in on the calendar.",
  },
  {
    id: "q5",
    label: "3M",
    x: 44,
    y: 74,
    description:
      "Security is approved in the tracker. Procurement confirmed steps and a target PO date. They hired a new VP who has rolled this out before at a current customer.",
  },
  {
    id: "q6",
    label: "General Mills",
    x: 28,
    y: 62,
    description:
      "A decision meeting is on the calendar with an exec sponsor. Success criteria and a decision date are agreed. The sponsor asked for a contract draft to review.",
  },
  {
    id: "q7",
    label: "Tyson Foods",
    x: 22,
    y: 40,
    description:
      "Pain is tied to a KPI and the team is engaged. The economic buyer has not joined a call yet. Tasks are assigned but there is no decision date.",
  },
  {
    id: "q8",
    label: "Kroger",
    x: 14,
    y: 24,
    description:
      "There is a new champion but they cannot name the budget owner. The criteria keeps changing. The next meeting is exploratory, not a decision checkpoint.",
  },
  {
    id: "q10",
    label: "Costco",
    x: 86,
    y: 36,
    description:
      "Scope expanded after the last review. New approvers joined late and reopened evaluation. The next meeting slipped twice and the decision date is gone.",
  },
  {
    id: "q11",
    label: "Marriott",
    x: 92,
    y: 70,
    description:
      "Legal is engaged but not at signature. Procurement reopened pricing and asked for re-approval paperwork. They want a revised quote before continuing redlines.",
  },
  {
    id: "q12",
    label: "Hilton",
    x: 52,
    y: 54,
    description:
      "Budget is pending and the owner is not confirmed in writing. Stakeholders disagree on must-haves. A meeting is booked to align before a decision.",
  },
  {
    id: "q13",
    label: "Delta Air Lines",
    x: 80,
    y: 76,
    description:
      "The buyer confirmed success criteria and the implementation plan. The economic buyer asked for the final contract package. Signature authority and a target close date are known.",
  },
  {
    id: "q14",
    label: "Southwest Airlines",
    x: 72,
    y: 96,
    description:
      "The decision maker committed in the meeting notes. Implementation time is blocked. The buyer agreed to a signature date and procurement steps.",
  },
  {
    id: "q15",
    label: "FedEx",
    x: 76,
    y: 22,
    description:
      "Tone turned defensive and next steps got vague. They asked for a side-by-side against two vendors. A new competitor bundle is in their eval doc.",
  },
  {
    id: "q16",
    label: "UPS",
    x: 94,
    y: 54,
    description:
      "The champion is supportive but cannot bypass procurement. Procurement added new compliance questions after pricing. Legal and procurement steps are not mapped to a close date.",
  },
  {
    id: "q17",
    label: "Waste Management",
    x: 40,
    y: 84,
    description:
      "They gave a hard go-live date tied to an internal program. Security is approved with no blockers. Procurement asked for final terms to issue a PO.",
  },
  {
    id: "q18",
    label: "Republic Services",
    x: 18,
    y: 82,
    description:
      "There is an off-CRM thread coordinating procurement and legal. They shared a target signature week and an approver list. They also posted an RFP and job listings for this workflow.",
  },
  {
    id: "q19",
    label: "Home Depot",
    x: 42,
    y: 46,
    description:
      "The last meeting ended with no owners for next steps. There is no decision date and the follow-up is a check-in. The economic buyer is not engaged.",
  },
  {
    id: "q20",
    label: "Lowe's",
    x: 30,
    y: 16,
    description:
      "The budget owner has not joined any meetings. Email responses slowed from days to weeks. There is no next meeting scheduled.",
  },
  {
    id: "q22",
    label: "IKEA",
    x: 48,
    y: 18,
    description:
      "Pilot usage plateaued and the end date passed. The sponsor changed roles and lost influence. Procurement and legal steps never started.",
  },
  {
    id: "q23",
    label: "United Rentals",
    x: 60,
    y: 36,
    description:
      "Procurement asked for a fresh scoring matrix and new requirements. Late stakeholders are re-running discovery. The original close date was removed from the plan.",
  },
  {
    id: "q24",
    label: "Sysco",
    x: 90,
    y: 28,
    description:
      "Procurement paused onboarding and asked to wait for direction. The buyer said they are reducing tool count. Their acquisition plan is pushing standardization and vendor cuts.",
  },
];

const layout = buildQuadrantLayout({
  dimensions: CHART_DIMENSIONS,
  padding: CHART_PADDING,
  axisLabelOffset: AXIS_LABEL_OFFSET,
  xMid,
  yMid,
});

const points = projectQuadrantPoints(basePoints, layout, {
  xMid,
  yMid,
  disagreeThreshold: DISAGREE_THRESHOLD,
});

export const quadrantExample: QuadrantChartData = {
  id: "example-quadrant",
  title: "Find opportunities by comparing your two forecasts",
  subtitle:
    "Overbase does an in-depth audit which gives you a second forecast that you can compare with your current forecast to find hidden sales opportunities.",
  xLabel: "Current close probability",
  yLabel: "Overbase close probability",
  xMid,
  yMid,
  disagreeThreshold: DISAGREE_THRESHOLD,
  layout,
  points,
};
