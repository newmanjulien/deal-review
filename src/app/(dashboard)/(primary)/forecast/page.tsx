import { CanvasHero } from "@/components/canvas/canvas-hero";
import { CanvasPage } from "@/components/canvas/canvas-page";
import { FORECAST_PAGE_CONFIG } from "./forecast-config";
import { quadrantExampleChart, Quadrant } from "./quadrant";

export default function ForecastPage() {
  return (
    <CanvasPage
      hero={
        <CanvasHero
          title={FORECAST_PAGE_CONFIG.title}
          description={FORECAST_PAGE_CONFIG.description}
        />
      }
    >
      <section className="space-y-3">
        <Quadrant chart={quadrantExampleChart} />
      </section>
    </CanvasPage>
  );
}
