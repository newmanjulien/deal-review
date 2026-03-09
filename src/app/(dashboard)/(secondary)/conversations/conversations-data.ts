import {
  dashboardSellersData,
  type DashboardSellerId,
} from "../../_data/dashboard-sellers-data";
import type { ConversationRow } from "./conversations-types";

type ConversationRowRecord = Omit<ConversationRow, "owner" | "ownerAvatar"> & {
  ownerId: DashboardSellerId;
};

const conversationRowRecords: ConversationRowRecord[] = [
  {
    id: "greenline-energy-olivia-chen",
    cardNumber: 74,
    probability: 25,
    contact: "Olivia Chen",
    deal: "3M deal",
    ownerId: "julien",
    stage: "Discovery",
    lastActivityAtIso: "2026-03-08T12:00:00Z",
  },
  {
    id: "orion-telecom-noah-bennett",
    cardNumber: 92,
    probability: 60,
    contact: "Noah Bennett",
    deal: "FedEx deal",
    ownerId: "julien",
    stage: "Proposal",
    lastActivityAtIso: "2026-03-07T18:00:00Z",
  },
  {
    id: "northwind-health-maya-rodriguez",
    cardNumber: 87,
    probability: 35,
    contact: "Maya Rodriguez",
    deal: "Caterpillar deal",
    ownerId: "julien",
    stage: "Negotiation",
    lastActivityAtIso: "2026-03-08T15:00:00Z",
  },
  {
    id: "summit-payments-ava-morgan",
    cardNumber: 90,
    probability: 75,
    contact: "Ava Morgan",
    deal: "Southwest Airlines deal",
    ownerId: "yash",
    stage: "Negotiation",
    lastActivityAtIso: "2026-03-08T14:00:00Z",
  },
  {
    id: "helix-financial-priya-nanda",
    cardNumber: 31,
    probability: 100,
    contact: "Priya Nanda",
    deal: "John Deere deal",
    ownerId: "yash",
    stage: "Closed won",
    lastActivityAtIso: "2026-03-05T13:00:00Z",
  },
  {
    id: "brightpath-education-emma-davis",
    cardNumber: 86,
    probability: 0,
    contact: "Emma Davis",
    deal: "Hilton deal",
    ownerId: "julien",
    stage: "Closed lost",
    lastActivityAtIso: "2026-03-01T16:00:00Z",
  },
];

function toConversationRow(record: ConversationRowRecord): ConversationRow {
  const seller = dashboardSellersData.queries.getSellerById(record.ownerId);

  return {
    id: record.id,
    cardNumber: record.cardNumber,
    probability: record.probability,
    contact: record.contact,
    deal: record.deal,
    stage: record.stage,
    lastActivityAtIso: record.lastActivityAtIso,
    owner: seller.name,
    ownerAvatar: seller.avatar,
  };
}

const conversationRows = conversationRowRecords.map(toConversationRow);

function getConversationRowById(conversationId: string): ConversationRow | null {
  return conversationRows.find((row) => row.id === conversationId) ?? null;
}

export const conversationsData = {
  records: {
    rows: conversationRowRecords,
  },
  views: {
    sellerPeople: dashboardSellersData.views.people,
    rows: conversationRows,
  },
  queries: {
    getConversationRowById,
  },
} as const;
