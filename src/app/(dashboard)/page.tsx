import { redirect } from "next/navigation";
import { DEFAULT_DASHBOARD_ROUTE } from "./_routes/dashboard-routes";

export default function DashboardIndexPage() {
  redirect(DEFAULT_DASHBOARD_ROUTE);
}
