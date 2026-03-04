import type { ReactNode } from "react";
import { LayoutClient } from "./layout-client";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <LayoutClient>{children}</LayoutClient>;
}
