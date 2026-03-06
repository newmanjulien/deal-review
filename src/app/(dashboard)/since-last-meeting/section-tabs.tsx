import { tabs, type TabId } from "./dummy-data";

type SectionTabsProps = {
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
};

export function SectionTabs({ activeTab, onTabChange }: SectionTabsProps) {
  return (
    <div className="flex items-center gap-6 border-b border-zinc-100">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
            activeTab === tab.id ? "text-zinc-900" : "text-zinc-500"
          }`}
        >
          {tab.label}
          {activeTab === tab.id ? (
            <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
