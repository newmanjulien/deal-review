"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type RefObject } from "react";
import { X } from "lucide-react";
import { isNavItemActive, primaryNavItems } from "./nav-config";
import { SidebarNav } from "./sidebar-nav";

type MobileNavDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export function MobileNavDrawer({
  isOpen,
  onClose,
  triggerRef,
}: MobileNavDrawerProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousPathnameRef = useRef(pathname);
  const wasOpenRef = useRef(false);

  const activeHref =
    primaryNavItems.find((item) => isNavItemActive(pathname, item.href))
      ?.href ?? null;

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
    <div className="fixed inset-0 z-50 transition-opacity duration-200 md:hidden">
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-zinc-950/35"
        onClick={onClose}
      />
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="absolute inset-y-0 left-0 flex w-72 max-w-[84vw] flex-col border-r border-zinc-200 bg-white p-4 shadow-lg transition-transform duration-200 ease-out"
      >
        <div className="mb-6 flex items-center justify-between">
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
            aria-label="Close navigation menu"
            className="inline-flex size-8 items-center justify-center rounded-sm text-zinc-700 transition-colors hover:bg-zinc-100"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </div>

        <SidebarNav
          items={primaryNavItems}
          activeHref={activeHref}
          variant="drawer"
          onItemSelect={onClose}
        />
      </aside>
    </div>
  );
}
