import type {
  DataDisplayTableRow,
  DataDisplayTimelineItem,
  DataDisplayCard,
} from "@/components/data-display/data-display-types";
import type { HeaderPerson } from "@/components/canvas/canvas-types";

export const opportunitiesSharedPeople: HeaderPerson[] = [
  {
    name: "Aditya Newman",
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
    title: "Checkout confirmation email delay",
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
    title: "Checkout confirmation email delay",
    dealLabel: "Honeywell",
    avatars: [
      opportunitiesSharedPeople[1].avatar,
      opportunitiesSharedPeople[0].avatar,
    ],
    priority: "high",
    priorityLabel: "High priority",
  },
] as const;
