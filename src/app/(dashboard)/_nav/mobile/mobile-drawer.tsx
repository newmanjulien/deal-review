"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";
import { X } from "lucide-react";
import { Nav, PRIMARY_NAV_GROUPS, useNav } from "..";

export function MobileDrawer({
  isOpen,
  onClose,
  triggerRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const {
    state: { activeHref, pathname },
  } = useNav(PRIMARY_NAV_GROUPS);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousPathnameRef = useRef(pathname);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const previousPathname = previousPathnameRef.current;
    previousPathnameRef.current = pathname;
    if (!isOpen || pathname === previousPathname) return;
    onClose();
  }, [pathname, isOpen, onClose]);

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white md:hidden">
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="aria"
        className="flex h-full flex-col"
      >
        <header className="flex h-12 items-center border-b border-zinc-100 bg-white px-[var(--shell-gutter-mobile)]">
          <div className="overflow-hidden rounded-sm">
            <Image
              src="/logo.png"
              alt="Logo"
              width={20}
              height={20}
              className="size-6"
              priority
            />
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="aria"
            className="ml-auto inline-flex size-8 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:bg-zinc-100"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          <Nav
            groups={PRIMARY_NAV_GROUPS}
            activeHref={activeHref}
            variant="drawer"
            onItemSelect={onClose}
            className="mt-2"
          />
        </div>
      </aside>
    </div>
  );
}
