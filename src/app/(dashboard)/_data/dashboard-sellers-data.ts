import type { HeaderPerson } from "@/types/domain/people";

const sellerRecords = [
  {
    id: "julien",
    name: "Julien Newman",
    avatar: "/avatars/aditya.jpg",
  },
  {
    id: "yash",
    name: "Yash Patel",
    avatar: "/avatars/yash.webp",
  },
] as const;

export type DashboardSellerId = (typeof sellerRecords)[number]["id"];
type DashboardSellerRecord = (typeof sellerRecords)[number];

const sellersById = {
  julien: sellerRecords[0],
  yash: sellerRecords[1],
} as const satisfies Record<DashboardSellerId, DashboardSellerRecord>;

const sellerPeople: HeaderPerson[] = sellerRecords.map(({ name, avatar }) => ({
  name,
  avatar,
}));

function getSellerById(sellerId: DashboardSellerId): DashboardSellerRecord {
  return sellersById[sellerId];
}

export const dashboardSellersData = {
  records: {
    sellers: sellerRecords,
    sellersById,
  },
  views: {
    people: sellerPeople,
  },
  queries: {
    getSellerById,
  },
} as const;
