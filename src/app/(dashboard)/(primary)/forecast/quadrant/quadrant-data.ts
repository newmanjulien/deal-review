import type { QuadrantPointSeed } from "./quadrant-types";

function point(
  id: QuadrantPointSeed["id"],
  label: QuadrantPointSeed["label"],
  x: number,
  y: number,
  description: QuadrantPointSeed["description"],
): QuadrantPointSeed {
  return { id, label, x, y, description };
}

const opportunityPointSeeds: QuadrantPointSeed[] = [
  point(
    "q2",
    "Sherwin-Williams",
    68,
    82,
    "The economic buyer confirmed budget in email. Procurement started vendor setup and shared a timeline. Security is marked complete with no blockers.",
  ),
  point(
    "q4",
    "John Deere",
    58,
    90,
    "Legal returned a marked-up agreement with targeted edits. The CFO asked rollout and success questions for sign-off. Kickoff is already penciled in on the calendar.",
  ),
  point(
    "q5",
    "3M",
    44,
    74,
    "Security is approved in the tracker. Procurement confirmed steps and a target PO date. They hired a new VP who has rolled this out before at a current customer.",
  ),
  point(
    "q6",
    "General Mills",
    28,
    62,
    "A decision meeting is on the calendar with an exec sponsor. Success criteria and a decision date are agreed. The sponsor asked for a contract draft to review.",
  ),
  point(
    "q7",
    "Tyson Foods",
    22,
    40,
    "Pain is tied to a KPI and the team is engaged. The economic buyer has not joined a call yet. Tasks are assigned but there is no decision date.",
  ),
  point(
    "q8",
    "Kroger",
    14,
    24,
    "There is a new champion but they cannot name the budget owner. The criteria keeps changing. The next meeting is exploratory, not a decision checkpoint.",
  ),
  point(
    "q14",
    "Southwest Airlines",
    72,
    96,
    "The decision maker committed in the meeting notes. Implementation time is blocked. The buyer agreed to a signature date and procurement steps.",
  ),
  point(
    "q17",
    "Waste Management",
    40,
    84,
    "They gave a hard go-live date tied to an internal program. Security is approved with no blockers. Procurement asked for final terms to issue a PO.",
  ),
  point(
    "q18",
    "Republic Services",
    18,
    82,
    "There is an off-CRM thread coordinating procurement and legal. They shared a target signature week and an approver list. They also posted an RFP and job listings for this workflow.",
  ),
];

const alignedPointSeeds: QuadrantPointSeed[] = [
  point(
    "q1",
    "Caterpillar",
    88,
    90,
    "Redlines are in flight and getting resolved. The buyer confirmed who signs and what procurement needs. There is a dated close plan with owners.",
  ),
  point(
    "q12",
    "Hilton",
    52,
    54,
    "Budget is pending and the owner is not confirmed in writing. Stakeholders disagree on must-haves. A meeting is booked to align before a decision.",
  ),
  point(
    "q13",
    "Delta Air Lines",
    80,
    76,
    "The buyer confirmed success criteria and the implementation plan. The economic buyer asked for the final contract package. Signature authority and a target close date are known.",
  ),
  point(
    "q19",
    "Home Depot",
    42,
    46,
    "The last meeting ended with no owners for next steps. There is no decision date and the follow-up is a check-in. The economic buyer is not engaged.",
  ),
];

const riskPointSeeds: QuadrantPointSeed[] = [
  point(
    "q3",
    "Whirlpool",
    78,
    62,
    "Calls turned defensive and they asked for concessions before agreeing to a next step. The champion stopped replying after the pricing doc. A competitor was added to the next eval call.",
  ),
  point(
    "q10",
    "Costco",
    86,
    36,
    "Scope expanded after the last review. New approvers joined late and reopened evaluation. The next meeting slipped twice and the decision date is gone.",
  ),
  point(
    "q11",
    "Marriott",
    92,
    70,
    "Legal is engaged but not at signature. Procurement reopened pricing and asked for re-approval paperwork. They want a revised quote before continuing redlines.",
  ),
  point(
    "q15",
    "FedEx",
    76,
    22,
    "Tone turned defensive and next steps got vague. They asked for a side-by-side against two vendors. A new competitor bundle is in their eval doc.",
  ),
  point(
    "q16",
    "UPS",
    94,
    54,
    "The champion is supportive but cannot bypass procurement. Procurement added new compliance questions after pricing. Legal and procurement steps are not mapped to a close date.",
  ),
  point(
    "q20",
    "Lowe's",
    30,
    16,
    "The budget owner has not joined any meetings. Email responses slowed from days to weeks. There is no next meeting scheduled.",
  ),
  point(
    "q22",
    "IKEA",
    48,
    18,
    "Pilot usage plateaued and the end date passed. The sponsor changed roles and lost influence. Procurement and legal steps never started.",
  ),
  point(
    "q23",
    "United Rentals",
    60,
    36,
    "Procurement asked for a fresh scoring matrix and new requirements. Late stakeholders are re-running discovery. The original close date was removed from the plan.",
  ),
  point(
    "q24",
    "Sysco",
    90,
    28,
    "Procurement paused onboarding and asked to wait for direction. The buyer said they are reducing tool count. Their acquisition plan is pushing standardization and vendor cuts.",
  ),
];

const examplePointSeeds: QuadrantPointSeed[] = [
  ...opportunityPointSeeds,
  ...alignedPointSeeds,
  ...riskPointSeeds,
];

function getPointSeedById(pointId: string): QuadrantPointSeed | null {
  return examplePointSeeds.find((point) => point.id === pointId) ?? null;
}

export const quadrantData = {
  records: {
    pointSeeds: {
      opportunity: opportunityPointSeeds,
      aligned: alignedPointSeeds,
      risk: riskPointSeeds,
      all: examplePointSeeds,
    },
  },
  views: {
    examplePointSeeds,
  },
  queries: {
    getPointSeedById,
  },
} as const;
