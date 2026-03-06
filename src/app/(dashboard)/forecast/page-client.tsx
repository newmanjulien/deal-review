import { CanvasPageShell } from "@/components/canvas/canvas-page";
import { FORECAST_PAGE_CONFIG } from "./forecast-config";
import { quadrantExampleChart } from "./quadrant/quadrant-chart";
import { Quadrant } from "./quadrant/quadrant";

export function ForecastPageClient() {
  return (
    <CanvasPageShell
      title={FORECAST_PAGE_CONFIG.title}
      description={FORECAST_PAGE_CONFIG.description}
    >
      <section className="space-y-3">
        <Quadrant chart={quadrantExampleChart} />
      </section>
    </CanvasPageShell>
  );
}
