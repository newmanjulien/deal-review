import type { ReactNode } from "react";
import { PrimaryLayoutShell } from "./primary-layout-shell";

export default function PrimaryLayout({ children }: { children: ReactNode }) {
  return <PrimaryLayoutShell>{children}</PrimaryLayoutShell>;
}
