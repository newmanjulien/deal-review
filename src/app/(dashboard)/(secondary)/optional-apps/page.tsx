"use client";

import type { SyntheticEvent } from "react";
import { CanvasHero } from "@/components/canvas/canvas-hero";
import { CanvasOnlyPage } from "@/components/canvas/canvas-page";
import { Button } from "@/components/ui/button";
import {
  OPTIONAL_APP_ICONS,
  OPTIONAL_APP_SECTION_CONFIGS,
  OPTIONAL_APPS_PAGE_CONFIG,
} from "./optional-apps-config";
import { OptionalAppCard } from "./optional-app-card";
import { optionalAppsData } from "./optional-apps-data";

export default function OptionalAppsPage() {
  const handleIdeaSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <CanvasOnlyPage
      hero={
        <CanvasHero
          title={OPTIONAL_APPS_PAGE_CONFIG.title}
          description={OPTIONAL_APPS_PAGE_CONFIG.description}
        />
      }
    >
      <div className="space-y-6">
        {OPTIONAL_APP_SECTION_CONFIGS.map((section) => {
          const sectionApps = optionalAppsData.views.appsByTier[section.id];

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
                {sectionApps.map((app) => (
                  <OptionalAppCard
                    key={app.id}
                    app={app}
                    icon={OPTIONAL_APP_ICONS[app.id]}
                  />
                ))}
              </div>
            </section>
          );
        })}

        <section className="rounded-md border border-zinc-200/70 mt-12 p-4">
          <header>
            <h2 className="text-xs font-medium tracking-wide text-zinc-900">
              What app should we build next?
            </h2>
            <p className="mt-1 text-xs leading-relaxed tracking-wide text-zinc-500">
              What part of your sales workflow could we help with?
            </p>
          </header>

          <form className="mt-3 space-y-3" onSubmit={handleIdeaSubmit}>
            <textarea
              name="app-idea"
              rows={4}
              placeholder="Share your idea..."
              className="w-full resize-y rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs leading-relaxed tracking-wide text-zinc-800 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />

            <div className="flex justify-end">
              <Button type="submit" variant="outline" size="xs">
                Submit idea
              </Button>
            </div>
          </form>
        </section>
      </div>
    </CanvasOnlyPage>
  );
}
