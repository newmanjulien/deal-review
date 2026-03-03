"use client";

export function NotesPanel() {
  return (
    <aside className="min-h-0 w-95 border-l border-zinc-100">
      <div className="h-full overflow-y-auto p-5">
        <div className="space-y-5">
          <section className="space-y-2">
            <label
              htmlFor="private-notes"
              className="block text-xs font-medium text-zinc-700"
            >
              Private notes
            </label>
            <p className="text-xs leading-relaxed text-zinc-400">
              Capture private notes for yourself and for your meeting with your
              rep
            </p>
            <textarea
              id="private-notes"
              name="private-notes"
              rows={6}
              placeholder="Leave notes for yourself"
              className="w-full resize-y rounded-sm border border-zinc-100 bg-white px-3 py-2 text-xs leading-relaxed text-zinc-700 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
          </section>
          <div aria-hidden="true" className="-mx-5 border-t border-zinc-100" />
          <section className="space-y-2">
            <label
              htmlFor="scientist-feedback"
              className="block text-xs font-medium text-zinc-700"
            >
              Feedback
            </label>
            <p className="text-xs leading-relaxed text-zinc-400">
              Share feedback which the data scientist who prepared this insight
              will read
            </p>
            <textarea
              id="scientist-feedback"
              name="scientist-feedback"
              rows={6}
              placeholder="Share feedback"
              className="w-full resize-y rounded-sm border border-zinc-100 bg-white px-3 py-2 text-xs leading-relaxed text-zinc-700 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
          </section>
        </div>
      </div>
    </aside>
  );
}
