# Tomer's Software Portal

Public hub for software Tomer ships. v1 is a dark editorial landing page with a left nav drawer driven by a typed app registry.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm test        # nav registry unit tests
```

## Adding an app to the menu

Edit `lib/apps.ts` and append a row to the `apps` array:

```ts
{
  id: "my-app",          // unique
  label: "My App",
  href: "/my-app",       // or an absolute URL
  kind: "route",         // "route" | "external"
}
```

Internal pages use `kind: "route"`. Links off-site use `kind: "external"`.
