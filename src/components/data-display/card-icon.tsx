import {
  CircleOff,
  Clock3,
  KeyRound,
  Lightbulb,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { DataDisplayCardIconKey } from "@/components/data-display/data-display-types";

const DATA_DISPLAY_CARD_ICON_MAP: Record<DataDisplayCardIconKey, LucideIcon> = {
  "circle-off": CircleOff,
  "clock-3": Clock3,
  "key-round": KeyRound,
  lightbulb: Lightbulb,
  "triangle-alert": TriangleAlert,
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
