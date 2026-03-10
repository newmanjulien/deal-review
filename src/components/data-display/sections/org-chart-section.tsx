import type { DataDisplayOrgChartNode } from "@/components/data-display/data-display-types";

type OrgChartSectionProps = {
  root: DataDisplayOrgChartNode;
};

type OrgChartNodeCardProps = {
  node: DataDisplayOrgChartNode;
};

function OrgChartNodeCard({ node }: OrgChartNodeCardProps) {
  return (
    <article className="w-40 rounded-sm border border-zinc-100 bg-zinc-50/35 px-3 py-2">
      <h2 className="text-xs leading-relaxed font-medium tracking-wide text-zinc-900">
        {node.name}
      </h2>
      <p className="text-[11px] leading-relaxed tracking-wide text-zinc-500">
        {node.role}
      </p>
      <p className="mt-2 text-[10px] tracking-wide text-zinc-400">
        Last contact
      </p>
      <p className="text-[11px] leading-relaxed tracking-wide text-zinc-500">
        {node.lastContacted.by} on {node.lastContacted.on}
      </p>
    </article>
  );
}

type OrgChartBranchProps = {
  node: DataDisplayOrgChartNode;
};

function OrgChartBranch({ node }: OrgChartBranchProps) {
  const directReports = node.directReports ?? [];
  const hasDirectReports = directReports.length > 0;
  const hasMultipleDirectReports = directReports.length > 1;

  return (
    <li className="flex shrink-0 flex-col items-center">
      <OrgChartNodeCard node={node} />
      {hasDirectReports ? (
        <div className="mt-1 flex min-w-max flex-col items-center">
          <span aria-hidden className="h-4 w-px bg-zinc-200" />
          <ol
            className={`flex items-start justify-center gap-3 px-2 pt-4 ${
              hasMultipleDirectReports ? "border-t border-zinc-200" : ""
            }`}
          >
            {directReports.map((directReport) => (
              <OrgChartBranch key={directReport.id} node={directReport} />
            ))}
          </ol>
        </div>
      ) : null}
    </li>
  );
}

export function OrgChartSection({ root }: OrgChartSectionProps) {
  return (
    <section className="rounded-sm border border-zinc-100 bg-white px-3 py-3">
      <div className="overflow-x-auto pb-1">
        <ol className="inline-flex min-w-full justify-center pt-1">
          <OrgChartBranch node={root} />
        </ol>
      </div>
    </section>
  );
}
