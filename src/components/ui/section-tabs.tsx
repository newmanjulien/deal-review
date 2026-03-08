import { cn } from "@/lib/utils";

export type SectionTabOption<Id extends string> = {
  id: Id;
  label: string;
};

type SectionTabsProps<Id extends string> = {
  tabs: readonly SectionTabOption<Id>[];
  activeTabId: Id;
  onTabChange: (id: Id) => void;
  className?: string;
};

export function SectionTabs<Id extends string>({
  tabs,
  activeTabId,
  onTabChange,
  className,
}: SectionTabsProps<Id>) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors",
              isActive ? "text-zinc-900" : "text-zinc-500",
            )}
          >
            {tab.label}
            {isActive ? (
              <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
