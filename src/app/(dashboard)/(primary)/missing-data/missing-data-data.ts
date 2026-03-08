import type { DataDisplayCard } from "@/components/data-display/data-display-types";
import type { HeaderPerson } from "@/app/(dashboard)/_chrome/chrome-types";

export const missingDataSharedPeople: HeaderPerson[] = [
  {
    name: "Julien Newman",
    avatar: "/avatars/aditya.jpg",
  },
  {
    name: "Yash Patel",
    avatar: "/avatars/yash.webp",
  },
];

export const missingDataCards: DataDisplayCard[] = [
  {
    id: "118",
    title: "Not sure who is the economic buyer",
    iconKey: "missing",
    dealLabel: "Honeywell",
    avatars: [missingDataSharedPeople[1].avatar],
    priority: "high",
    priorityLabel: "High priority",
  },
  {
    id: "120",
    title: "Deadline for 3M's RFP is unknown",
    description:
      "A spike in users clicking on reset links but not completing the reset flow were detected. Error rates surged within ten minutes of the latest deployment.",
    iconKey: "missing",
    dealLabel: "3M",
    avatars: [
      missingDataSharedPeople[0].avatar,
      missingDataSharedPeople[1].avatar,
    ],
    priority: "medium",
    priorityLabel: "Medium priority",
    href: "/missing-data/cards/120",
  },
] as const;

export const missingDataTimelineCards: DataDisplayCard[] = [
  {
    id: "119",
    title: "Director of Finance was supposed to revert last week",
    iconKey: "timing",
    dealLabel: "Timeline review",
    avatars: [
      missingDataSharedPeople[0].avatar,
      missingDataSharedPeople[1].avatar,
    ],
    priority: "medium",
    priorityLabel: "Medium priority",
  },
] as const;

const allMissingDataCards = [
  ...missingDataCards,
  ...missingDataTimelineCards,
] as const;

export function getMissingDataCardById(cardId: string) {
  return allMissingDataCards.find((card) => card.id === cardId) ?? null;
}
