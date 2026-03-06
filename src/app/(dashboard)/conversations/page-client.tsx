"use client";

import { CanvasWidePageShell } from "@/components/canvas/canvas-page-shell";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { conversationRows } from "./dummy-data";

export function ConversationsPageClient() {
  return (
    <CanvasWidePageShell>
      <section className="mx-auto flex h-full w-full max-w-6xl flex-col py-6">
        <header className="mb-6 border-b border-zinc-100 pb-4">
          <h1 className="text-sm font-medium tracking-wide text-zinc-900">
            All conversations
          </h1>
          <p className="mt-1 max-w-xl text-xs leading-relaxed tracking-wide text-zinc-500">
            See the latest account conversations, owners, and deal stage at a
            glance
          </p>
        </header>

        <div className="overflow-hidden rounded-sm border border-zinc-100 bg-white">
          <Table className="min-w-full border-collapse">
            <TableHeader className="border-b border-zinc-100 bg-zinc-50/80">
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-[11px] font-medium tracking-wide text-zinc-500">
                  Company
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-[11px] font-medium tracking-wide text-zinc-500">
                  Contact
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-[11px] font-medium tracking-wide text-zinc-500">
                  Topic
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-[11px] font-medium tracking-wide text-zinc-500">
                  Owner
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-[11px] font-medium tracking-wide text-zinc-500">
                  Stage
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-[11px] font-medium tracking-wide text-zinc-500">
                  Last update
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-zinc-100">
              {conversationRows.map((row) => (
                <TableRow
                  key={`${row.company}-${row.contact}`}
                  className="transition-colors hover:bg-zinc-50/80"
                >
                  <TableCell className="whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wide text-zinc-900">
                    {row.company}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600">
                    {row.contact}
                  </TableCell>
                  <TableCell className="min-w-60 px-4 py-3 text-xs tracking-wide text-zinc-600">
                    {row.topic}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600">
                    {row.owner}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3 text-xs">
                    <Badge
                      variant="outline"
                      className="rounded-sm border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium tracking-wide text-zinc-600"
                    >
                      {row.stage}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-500">
                    {row.lastUpdate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </CanvasWidePageShell>
  );
}
