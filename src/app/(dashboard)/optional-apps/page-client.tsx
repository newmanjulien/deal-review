"use client";

import { File, MessageCircle, PhoneCall, type LucideIcon } from "lucide-react";
import { CanvasOnlyPageShell } from "@/components/canvas/canvas-page-shell";
import { Button } from "@/components/ui/button";

type OptionalApp = {
  name: string;
  description: string;
  icon: LucideIcon;
};

type OptionalAppSection = {
  id: "paid" | "free";
  title: string;
  subtitle: string;
  apps: OptionalApp[];
};

const optionalAppSections: OptionalAppSection[] = [
  {
    id: "free",
    title: "Free apps",
    subtitle: "Included with your workspace",
    apps: [
      {
        name: "Whatsapp assistant",
        description:
          "Send a Whatsapp message to your assistant when you want to remember to do something later. Then get a digest every morning with the tasks you need to do",
        icon: MessageCircle,
      },
      {
        name: "Call transcriber",
        description:
          "Add to a 3-way phone call. Then you will receive a transcript of the conversation by email after the call ends",
        icon: PhoneCall,
      },
    ],
  },
  {
    id: "paid",
    title: "Paid apps",
    subtitle: "Requires a paid add-on",
    apps: [
      {
        name: "RFP assistant",
        description:
          "Add your RFP, your assistant will help break it down into simple tasks. And delegate tasks to colleagues",
        icon: File,
      },
    ],
  },
];

export function OptionalAppsPageClient() {
  return (
    <CanvasOnlyPageShell>
      <section className="mx-auto flex h-full w-full max-w-3xl flex-col py-6">
        <header className="mb-6 border-b border-zinc-100 pb-4">
          <h1 className="text-sm font-medium tracking-wide text-zinc-900">
            Optional apps
          </h1>
          <p className="mt-1 max-w-xl text-xs leading-relaxed tracking-wide text-zinc-500">
            Add lightweight tools to support your sales workflows
          </p>
        </header>

        <div className="space-y-6 pb-6">
          {optionalAppSections.map((section) => (
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
                {section.apps.map((app) => {
                  const AppIcon = app.icon;

                  return (
                    <article
                      key={app.name}
                      className="flex items-center gap-4 rounded-lg border border-zinc-200/70 bg-white px-4 py-3"
                    >
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                        <AppIcon className="size-5 text-zinc-500" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium tracking-wide text-zinc-900">
                          {app.name}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed tracking-wide text-zinc-500">
                          {app.description}
                        </p>
                      </div>

                      <Button type="button" variant="outline" size="xs">
                        Install
                      </Button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </CanvasOnlyPageShell>
  );
}
