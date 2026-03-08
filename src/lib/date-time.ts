import type { IsoDateString, IsoDateTimeString } from "@/types/domain/date-time";

const MONTH_DAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

function getValidDate(value: string): Date | null {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function formatIsoDate(isoDate: IsoDateString): string {
  const date = getValidDate(`${isoDate}T00:00:00Z`);
  if (!date) {
    return isoDate;
  }

  return MONTH_DAY_FORMATTER.format(date);
}

export function formatIsoDateTimeRelative(
  isoDateTime: IsoDateTimeString,
  now: Date = new Date(),
): string {
  const date = getValidDate(isoDateTime);
  if (!date) {
    return isoDateTime;
  }

  const deltaMs = date.getTime() - now.getTime();
  const absMs = Math.abs(deltaMs);
  const minuteMs = 60_000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;
  const weekMs = 7 * dayMs;

  if (absMs >= weekMs) {
    return RELATIVE_TIME_FORMATTER.format(Math.round(deltaMs / weekMs), "week");
  }

  if (absMs >= dayMs) {
    return RELATIVE_TIME_FORMATTER.format(Math.round(deltaMs / dayMs), "day");
  }

  if (absMs >= hourMs) {
    return RELATIVE_TIME_FORMATTER.format(Math.round(deltaMs / hourMs), "hour");
  }

  return RELATIVE_TIME_FORMATTER.format(Math.round(deltaMs / minuteMs), "minute");
}
