"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { apps, type AppEntry } from "@/lib/apps";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function NavLink({
  entry,
  current,
  onNavigate,
}: {
  entry: AppEntry;
  current: boolean;
  onNavigate: () => void;
}) {
  const className = [
    "block rounded-sm px-3 py-2 text-sm transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    current
      ? "bg-surface text-accent"
      : "text-foreground/90 hover:bg-surface hover:text-foreground",
  ].join(" ");

  if (entry.kind === "external") {
    return (
      <a
        href={entry.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        aria-current={current ? "page" : undefined}
      >
        {entry.label}
      </a>
    );
  }

  return (
    <Link
      href={entry.href}
      className={className}
      onClick={onNavigate}
      aria-current={current ? "page" : undefined}
    >
      {entry.label}
    </Link>
  );
}

export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerId = useId();
  const titleId = useId();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const openDrawer = useCallback(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const toggle = useCallback(() => {
    if (open) close();
    else openDrawer();
  }, [open, close, openDrawer]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const panel = panelRef.current;
      if (!panel) return;

      const focusables = () =>
        Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
        );

      // Defer so `hidden` is cleared before focusing
      requestAnimationFrame(() => {
        focusables()[0]?.focus();
      });

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        const items = focusables();
        if (items.length === 0) {
          e.preventDefault();
          return;
        }
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      };

      panel.addEventListener("keydown", onKeyDown);
      return () => panel.removeEventListener("keydown", onKeyDown);
    }

    if (wasOpen.current) {
      const target = previouslyFocused.current ?? burgerRef.current;
      previouslyFocused.current = null;
      requestAnimationFrame(() => {
        target?.focus();
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onBurgerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      openDrawer();
    }
  };

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={toggle}
        onKeyDown={onBurgerKeyDown}
      >
        {open ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 6h13M3.5 10h13M3.5 14h13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      <div
        className={[
          "drawer-overlay fixed inset-0 z-40 bg-black/50",
          open ? "opacity-100" : "pointer-events-none opacity-0",
          "transition-opacity duration-200 motion-reduce:transition-none",
        ].join(" ")}
        aria-hidden="true"
        onClick={close}
      />

      <div
        ref={panelRef}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={[
          "drawer-panel fixed inset-y-0 left-0 z-50 flex w-[min(280px,85vw)] flex-col border-r border-border bg-surface shadow-xl",
          open ? "translate-x-0" : "-translate-x-full pointer-events-none",
          "transition-transform duration-200 ease-out motion-reduce:transition-none",
        ].join(" ")}
        hidden={!open}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-3">
          <p id={titleId} className="text-sm font-medium text-foreground">
            Menu
          </p>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Close menu"
            onClick={close}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3" aria-label="Apps">
          <ul className="space-y-1">
            {apps.map((entry) => {
              const current =
                entry.kind === "route" &&
                (entry.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(entry.href));
              return (
                <li key={entry.id}>
                  <NavLink
                    entry={entry}
                    current={current}
                    onNavigate={close}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
