import { CanvasPage } from "@/components/canvas/canvas-page";
import { FORECAST_PAGE_CONFIG } from "./forecast-config";
import { quadrantExampleChart, Quadrant } from "./quadrant";

export function ForecastPageClient() {
  return (
    <CanvasPage
      title={FORECAST_PAGE_CONFIG.title}
      description={FORECAST_PAGE_CONFIG.description}
    >
      <section className="space-y-3">
        <Quadrant chart={quadrantExampleChart} />
      </section>
    </CanvasPage>
  );
}
