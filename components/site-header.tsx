import { NavDrawer } from "./nav-drawer";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex w-full items-center gap-2 pl-2 pr-4 sm:pl-3">
        <NavDrawer />
        <a
          href="/"
          className="min-w-0 truncate text-sm font-medium tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="hidden min-[360px]:inline">Tomer&apos;s Software Portal</span>
          <span className="min-[360px]:hidden">Portal</span>
        </a>
      </div>
    </header>
  );
}
