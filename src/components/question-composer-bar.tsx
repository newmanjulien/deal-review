"use client";

import { KeyboardEvent, useState } from "react";
import { Button } from "@/components/ui/button";

type QuestionComposerBarProps = {
  onAdd: (text: string) => void;
};

export function QuestionComposerBar({ onAdd }: QuestionComposerBarProps) {
  const [value, setValue] = useState("");

  const canAdd = value.trim().length > 0;

  const handleAdd = () => {
    if (!canAdd) return;

    onAdd(value.trim());
    setValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    ) {
      return;
    }

    event.preventDefault();
    handleAdd();
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden lg:block">
      <div className="h-20 bg-gradient-to-t from-white via-white/85 to-transparent" />
      <div className="pointer-events-auto -mt-8 px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 rounded-lg bg-zinc-100/60 px-3 py-2">
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type a potential question"
            className="min-h-6 max-h-24 flex-1 resize-none bg-transparent py-1 text-[13px] tracking-wide text-zinc-700 placeholder:text-zinc-500 focus-visible:outline-none"
          />
          <Button
            type="button"
            variant="secondary"
            className="h-7 rounded-sm bg-zinc-300 px-3 text-[13px] text-zinc-500 tracking-wide hover:bg-zinc-200 disabled:text-zinc-400"
            disabled={!canAdd}
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
