# Tomer's Software Portal

Invite-only hub for software Tomer ships. Dark editorial landing with a left nav drawer driven by a typed app registry, gated by Supabase Auth.

## Local development

Copy env and install:

```bash
cp .env.example .env.local
# fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated visitors are redirected to `/login`.

```bash
npm run build   # production build
npm test        # unit tests (nav registry + auth gate)
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Legacy anon (or publishable) key for the browser / SSR client |

Do **not** put `service_role` in the Next.js app. Keep real keys in `.env.local` (gitignored).

## Auth behavior

- No public signup - login page only.
- `proxy.ts` (Next.js 16 rename of middleware) refreshes the cookie session and gates every non-static path.
- After login, if `profiles.must_change_password` is true -> forced `/change-password` until cleared.
- Logged-in burger nav: registry apps (Home) + Sign out (UI action, not a registry row).

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
