import type { IsoDateString } from "@/types/domain/date-time";

const meetingDateIsos: IsoDateString[] = [
  "2026-01-26",
  "2026-01-12",
  "2025-12-29",
  "2025-12-15",
  "2025-12-01",
];

function getLatestMeetingDateIso(): IsoDateString | null {
  return meetingDateIsos[0] ?? null;
}

export const headerData = {
  records: {
    meetingDateIsos,
  },
  views: {
    meetingDateIsos,
  },
  queries: {
    getLatestMeetingDateIso,
  },
} as const;
