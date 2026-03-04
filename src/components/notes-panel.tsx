"use client";

export function NotesPanel() {
  return (
    <aside className="min-h-0 w-95 border-l border-zinc-100">
      <div className="h-full overflow-y-auto p-4">
        <div className="space-y-5">
          <section className="space-y-2">
            <label
              htmlFor="private-notes"
              className="block text-xs font-medium text-zinc-700"
            >
              Private notes
            </label>
            <p className="text-xs leading-relaxed text-zinc-400">
              Only you will see these notes
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
              Sent to the data scientist who prepared this insight
            </p>
            <textarea
              id="scientist-feedback"
              name="scientist-feedback"
              rows={6}
              placeholder="Share feedback"
              className="w-full resize-y rounded-sm border border-zinc-100 bg-white px-3 py-2 text-xs leading-relaxed text-zinc-700 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
          </section>
          <div aria-hidden="true" className="-mx-5 border-t border-zinc-100" />
          <section className="space-y-2">
            <label
              htmlFor="seller-questions"
              className="block text-xs font-medium text-zinc-700"
            >
              Questions for your seller
            </label>
            <p className="text-xs leading-relaxed text-zinc-400">
              Sent to the seller before your meeting
            </p>
            <textarea
              id="seller-questions"
              name="seller-questions"
              rows={6}
              placeholder="Add questions for your seller"
              className="w-full resize-y rounded-sm border border-zinc-100 bg-white px-3 py-2 text-xs leading-relaxed text-zinc-700 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
            />
          </section>
        </div>
      </div>
    </aside>
  );
}
