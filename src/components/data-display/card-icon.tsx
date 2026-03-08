import {
  CircleOff,
  Clock3,
  Lightbulb,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { DataDisplayCardIconKey } from "@/components/data-display/data-display-types";

const DATA_DISPLAY_CARD_ICON_MAP: Record<DataDisplayCardIconKey, LucideIcon> = {
  missing: CircleOff,
  timing: Clock3,
  opportunity: Lightbulb,
  risk: TriangleAlert,
};

type DataDisplayCardIconProps = {
  iconKey: DataDisplayCardIconKey;
  className?: string;
};

export function DataDisplayCardIcon({
  iconKey,
  className,
}: DataDisplayCardIconProps) {
  const Icon = DATA_DISPLAY_CARD_ICON_MAP[iconKey];

  return <Icon className={className} />;
}
