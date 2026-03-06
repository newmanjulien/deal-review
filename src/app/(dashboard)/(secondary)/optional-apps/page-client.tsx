import { CanvasOnlyPage } from "@/components/canvas/canvas-page";
import { Button } from "@/components/ui/button";
import {
  OPTIONAL_APP_ICONS,
  OPTIONAL_APP_SECTION_CONFIGS,
  OPTIONAL_APPS_PAGE_CONFIG,
} from "./optional-apps-config";
import { optionalApps } from "./optional-apps-data";

export function OptionalAppsPageClient() {
  return (
    <CanvasOnlyPage
      title={OPTIONAL_APPS_PAGE_CONFIG.title}
      description={OPTIONAL_APPS_PAGE_CONFIG.description}
    >
      <div className="space-y-6">
        {OPTIONAL_APP_SECTION_CONFIGS.map((section) => {
          const sectionApps = optionalApps.filter(
            (app) => app.tier === section.id,
          );

          return (
            <section key={section.id} className="space-y-3">
              <header className="px-1">
                <h2 className="text-xs font-medium tracking-wide text-zinc-900">
                  {section.title}
                </h2>
                <p className="mt-1 text-xs leading-relaxed tracking-wide text-zinc-500">
                  {section.subtitle}
                </p>
              </header>

              <div className="space-y-3">
                {sectionApps.map((app) => {
                  const AppIcon = OPTIONAL_APP_ICONS[app.id];

                  return (
                    <article
                      key={app.id}
                      className="flex items-center gap-4 rounded-lg border border-zinc-200/70 bg-white px-4 py-3"
                    >
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                        <AppIcon className="size-5 text-zinc-500" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs font-medium tracking-wide text-zinc-900">
                          {app.name}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed tracking-wide text-zinc-500">
                          {app.description}
                        </p>
                      </div>

                      <Button type="button" variant="outline" size="xs">
                        Learn more
                      </Button>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </CanvasOnlyPage>
  );
}
