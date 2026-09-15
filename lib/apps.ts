export type AppKind = "route" | "external";

export type AppEntry = {
  id: string;
  label: string;
  href: string;
  kind: AppKind;
};

/**
 * Typed registry of apps shown in the portal nav drawer.
 * Add a new row here to surface an app in the menu.
 */
export const apps: AppEntry[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    kind: "route",
  },
];
