import type { ReactNode } from "react";
import { LayoutClient } from "./layout-client";

export default function PrimaryLayout({ children }: { children: ReactNode }) {
  return <LayoutClient>{children}</LayoutClient>;
}
