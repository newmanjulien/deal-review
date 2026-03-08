"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import { X } from "lucide-react";
import { useDashboardChromeModel } from "@/app/(dashboard)/_chrome/chrome-ui";
import { DASHBOARD_ROUTE_PATHS } from "@/app/(dashboard)/_routes/dashboard-routes";
import { DrawerNav } from "./drawer-nav";

export function MobileDrawer({
  isOpen,
  onClose,
  triggerRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const chrome = useDashboardChromeModel();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
      return;
    }

    if (!wasOpenRef.current) return;
    wasOpenRef.current = false;
    triggerRef.current?.focus();
  }, [isOpen, triggerRef]);

  if (!isOpen || !chrome) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white md:hidden">
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="flex h-full flex-col"
      >
        <header className="flex h-11 items-center border-b border-zinc-100 bg-white px-[var(--shell-gutter-mobile)]">
          <Link
            href={DASHBOARD_ROUTE_PATHS["since-last-meeting"]}
            aria-label="Go to since last meeting"
            className="overflow-hidden rounded-sm"
            onClick={onClose}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={20}
              height={20}
              className="size-6"
              priority
            />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation menu"
            className="ml-auto inline-flex size-8 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:bg-zinc-100"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          <DrawerNav
            groups={chrome.nav.groups}
            activeHref={chrome.nav.activeHref}
            onItemSelect={onClose}
            className="mt-2"
          />
        </div>
      </aside>
    </div>
  );
}
