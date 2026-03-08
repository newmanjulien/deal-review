import Link from "next/link";
import type { DashboardChromeLeadingControl } from "@/app/(dashboard)/_routes/dashboard-routes";
import type { HeaderMenuAlign } from "./header-types";
import { MeetingDateMenu } from "./meeting-date-menu";

type HeaderLeadingControlProps = {
  leading: DashboardChromeLeadingControl;
  className?: string;
  meetingDateMenuId?: string;
  meetingDateTriggerId?: string;
  meetingDateAlign?: HeaderMenuAlign;
  meetingDateOpen?: boolean;
  onMeetingDateOpenChange?: (open: boolean) => void;
};

const DEFAULT_CONTROL_CLASS_NAME =
  "mr-2 ml-1 inline-flex items-center text-xs font-medium tracking-wide text-zinc-500 transition-colors hover:text-zinc-400";

export function HeaderLeadingControl({
  leading,
  className,
  meetingDateMenuId,
  meetingDateTriggerId,
  meetingDateAlign,
  meetingDateOpen,
  onMeetingDateOpenChange,
}: HeaderLeadingControlProps) {
  const controlClassName = className ?? DEFAULT_CONTROL_CLASS_NAME;

  if (leading.kind === "meeting-date") {
    return (
      <MeetingDateMenu
        id={meetingDateMenuId}
        triggerId={meetingDateTriggerId}
        align={meetingDateAlign}
        open={meetingDateOpen}
        onOpenChange={onMeetingDateOpenChange}
        triggerClassName={controlClassName}
      />
    );
  }

  return (
    <Link href={leading.href} className={controlClassName}>
      <span>{leading.label}</span>
    </Link>
  );
}
