import { CanvasPageShell } from "@/components/canvas/canvas-page";
import { quadrantExample } from "./quadrant/quadrant-data";
import { Quadrant } from "./quadrant/quadrant";

export function ForecastPageClient() {
  return (
    <CanvasPageShell
      title="Forecast"
      description="Compare your current close probabilities with Overbase's forecast to surface upside and risk before your next call."
    >
      <section className="space-y-3">
        <Quadrant chart={quadrantExample} />
      </section>
    </CanvasPageShell>
  );
}
