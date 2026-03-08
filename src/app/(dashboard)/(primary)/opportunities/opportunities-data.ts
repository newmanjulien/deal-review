import type { DataDisplayCard } from "@/components/data-display/data-display-types";
import type { HeaderPerson } from "@/types/domain/people";

export const opportunitiesSharedPeople: HeaderPerson[] = [
  {
    name: "Julien Newman",
    avatar: "/avatars/aditya.jpg",
  },
  {
    name: "Yash Patel",
    avatar: "/avatars/yash.webp",
  },
];

export const opportunitiesCards: DataDisplayCard[] = [
  {
    id: "118",
    title: "CFO was a customer at his last job",
    iconKey: "opportunity",
    dealLabel: "Honeywell",
    avatars: [
      opportunitiesSharedPeople[1].avatar,
      opportunitiesSharedPeople[0].avatar,
    ],
    priority: "high",
    priorityLabel: "High priority",
  },
] as const;

export const risksCards: DataDisplayCard[] = [
  {
    id: "118",
    title: "We've lost multiple RFPs at 3M",
    iconKey: "risk",
    dealLabel: "3M",
    avatars: [
      opportunitiesSharedPeople[1].avatar,
      opportunitiesSharedPeople[0].avatar,
    ],
    priority: "high",
    priorityLabel: "High priority",
  },
] as const;
