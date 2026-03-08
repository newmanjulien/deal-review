import { File, MessageCircle, PhoneCall, type LucideIcon } from "lucide-react";
import type { OptionalAppId, OptionalAppTier } from "./optional-apps-data";

type OptionalAppSectionConfig = {
  id: OptionalAppTier;
  title: string;
  subtitle: string;
};

export const OPTIONAL_APPS_PAGE_CONFIG = {
  headerTitle: "Optional apps",
  title: "Optional apps",
  description: "Add lightweight tools to support your sales workflows",
} as const;

export const OPTIONAL_APP_SECTION_CONFIGS: OptionalAppSectionConfig[] = [
  {
    id: "free",
    title: "Free apps",
    subtitle: "Included with your workspace",
  },
  {
    id: "paid",
    title: "Paid apps",
    subtitle: "Requires a paid add-on",
  },
];

export const OPTIONAL_APP_ICONS: Record<OptionalAppId, LucideIcon> = {
  reminders: MessageCircle,
  "call-transcriber": PhoneCall,
  rfps: File,
};
