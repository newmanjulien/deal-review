"use client";

import { KeyboardEvent, useLayoutEffect, useRef, useState } from "react";
import { DEFAULT_CANVAS_CONTENT_MAX_WIDTH_CLASS_NAME } from "@/components/canvas/canvas-page-shell";
import { Button } from "@/components/ui/button";
import {
  isQuestionSendable,
  normalizeQuestionText,
  QUESTION_COMPOSER_CONFIG,
  type QuestionComposerBarProps,
} from ".";

export function QuestionComposerBar({ onAdd }: QuestionComposerBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const canAdd = isQuestionSendable(value);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.overflowY = "hidden";
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    const nextHeight = Math.min(scrollHeight, QUESTION_COMPOSER_CONFIG.maxHeightPx);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY =
      scrollHeight > QUESTION_COMPOSER_CONFIG.maxHeightPx ? "auto" : "hidden";
  };

  useLayoutEffect(() => {
    resizeTextarea();
  }, [value]);

  const handleAdd = () => {
    if (!canAdd) return;

    onAdd(normalizeQuestionText(value));
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
    <div className="hidden border-t border-zinc-100 bg-white lg:block">
      <div className={`mx-auto w-full ${DEFAULT_CANVAS_CONTENT_MAX_WIDTH_CLASS_NAME}`}>
        <div className="px-4 pb-4 pt-3 sm:px-6 lg:px-8">
          <div className="flex items-end gap-2 rounded-lg bg-zinc-100/60 px-3 py-2">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder={QUESTION_COMPOSER_CONFIG.placeholder}
              className="min-h-7 max-h-40 flex-1 resize-none bg-transparent py-1 text-[13px] leading-5 tracking-wide text-zinc-700 placeholder:text-zinc-500 transition-[height] duration-150 ease-out focus-visible:outline-none"
            />
            <Button
              type="button"
              variant="secondary"
              className="h-7 rounded-sm bg-zinc-300 px-3 text-[13px] text-zinc-500 tracking-wide hover:bg-zinc-200 disabled:text-zinc-400"
              disabled={!canAdd}
              onClick={handleAdd}
            >
              {QUESTION_COMPOSER_CONFIG.addButtonLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
