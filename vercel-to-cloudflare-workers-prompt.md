# Universal Prompt: Migrate a Vercel Project to Cloudflare Workers

Paste everything below the line into your coding agent (Claude Code, Cursor, etc.) from the root of ONE project repo. Run it once per project.

---

## ROLE

You are a senior DevOps and full-stack engineer. Migrate the project in the current directory from Vercel to Cloudflare Workers. It must end up live at `https://<PROJECT_SLUG>.dhyandev.sbs`, where `<PROJECT_SLUG>` is derived from the project name. Work autonomously, verify each phase, and report clearly at the end.

## INPUTS (determine these yourself, ask only if truly ambiguous)

- **PROJECT_SLUG**: take the repo/folder name (or `name` in package.json), then lowercase it, replace spaces/underscores/dots with `-`, strip anything not `a-z0-9-`, and trim leading/trailing dashes. Max 63 chars. Example: `Daaym_Store` becomes `daaym-store`.
- **ROOT_DOMAIN**: `dhyandev.sbs` (the zone must already be on my Cloudflare account).
- **FINAL URL**: `https://${PROJECT_SLUG}.dhyandev.sbs`
- **Reserved, do not touch**: the root `dhyandev.sbs` (portfolio) and `links.dhyandev.sbs`. If PROJECT_SLUG collides with an existing subdomain or Worker, stop and ask me.

## PHASE 0: Audit (read-only, no changes yet)

1. Detect the stack: framework (Next.js / Vite+React / Astro / SvelteKit / Remix / Nuxt / plain static / Express / other), package manager (npm/pnpm/yarn/bun), Node version, and build/output settings.
2. Read `vercel.json`, `.vercel/`, `next.config.*`, `middleware.*`, `package.json` scripts, `.env*` files (names only, never print secret values), and any `api/` or `app/api/` routes.
3. List every Vercel-specific feature in use and decide its Cloudflare equivalent:

| Vercel feature | Cloudflare replacement |
|---|---|
| Serverless/Edge functions, API routes | Worker handlers (via OpenNext adapter or native `fetch` handler) |
| `vercel.json` rewrites/redirects/headers | Framework config, `public/_redirects`, `public/_headers`, or Worker code |
| Vercel KV / Edge Config | Workers KV |
| Vercel Postgres / Neon | Keep Neon via Hyperdrive, or migrate to D1 |
| Vercel Blob | R2 |
| SQLite / local file DB | D1 (Workers cannot use local disk or native SQLite) |
| Cron jobs (`crons` in vercel.json) | Cron Triggers in wrangler config |
| `next/image` optimization | Cloudflare Images binding, or `images.unoptimized` / custom loader |
| ISR / revalidate | OpenNext cache (R2 or KV incremental cache) |
| Analytics / Speed Insights | Remove, or replace with Cloudflare Web Analytics |
| Environment variables | `wrangler secret put` (secrets) and `vars` (non-secret) |

4. Flag anything that will NOT work on Workers (Node-only native modules, `fs` writes at runtime, long-running processes, websockets servers, large bundles over the Worker size limit). Propose a fix for each before changing code.
5. Output a short migration plan, then continue unless a blocker needs my decision.

## PHASE 1: Prepare the repo

1. Create a branch: `git checkout -b migrate/cloudflare-workers`. Do not touch `main`.
2. Install tooling: `wrangler` as a devDependency (latest). Confirm login with `npx wrangler whoami`. If not logged in, tell me to run `npx wrangler login` and wait.
3. Choose the path by stack:

**A) Next.js**
- Install `@opennextjs/cloudflare` and run its migration/setup (`npx @opennextjs/cloudflare migrate` or the manual steps).
- Create `open-next.config.ts` and `wrangler.jsonc`.
- Remove `export const runtime = 'edge'` from routes where the adapter requires Node runtime; keep the Node.js runtime and enable `nodejs_compat`.
- Add scripts: `"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview"`, `"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"`, `"cf-typegen": "wrangler types --env-interface CloudflareEnv ./cloudflare-env.d.ts"`.
- Add `initOpenNextCloudflareForDev()` to `next.config.*` for local dev bindings.

**B) Static / SPA (Vite, CRA, Astro static, plain HTML)**
- Use Workers Static Assets, no server code needed.
- `wrangler.jsonc` with `assets: { directory: "./dist", not_found_handling: "single-page-application" }` (use the real build output folder; use `404-page` handling for multi-page static sites).

**C) SSR frameworks (SvelteKit, Remix, Nuxt, Astro SSR)**
- Use the official Cloudflare adapter or preset for that framework, then configure `wrangler.jsonc` per its docs.

**D) Express / Node API**
- Port routes to Hono (or a native Worker `fetch` handler). Replace SQLite with D1 (create schema migrations in `/migrations`, run `wrangler d1 migrations apply`). Replace any file-system storage with R2 or KV.

4. Create `wrangler.jsonc` with at minimum:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "<PROJECT_SLUG>",
  "main": ".open-next/worker.js",              // adjust per stack
  "compatibility_date": "<today's date, YYYY-MM-DD>",
  "compatibility_flags": ["nodejs_compat"],
  "assets": { "directory": ".open-next/assets", "binding": "ASSETS" },  // adjust per stack
  "routes": [
    { "pattern": "<PROJECT_SLUG>.dhyandev.sbs", "custom_domain": true }
  ],
  "observability": { "enabled": true }
}
```

Add bindings (KV, D1, R2, Hyperdrive, cron `triggers`) only if Phase 0 found a need. Create the resources with `wrangler` and put the real IDs into the config.

## PHASE 2: Environment variables and secrets

1. From the names found in `.env*` and Vercel config, split into public vars (`vars` in wrangler) and secrets.
2. Never print or commit secret values. Create `.dev.vars` (gitignored) for local dev and `.dev.vars.example` with placeholder values.
3. For each secret, tell me the exact command: `npx wrangler secret put NAME`. If I give you the values, set them for me; otherwise list what I must set.
4. Update `.gitignore`: `.dev.vars`, `.open-next/`, `.wrangler/`, `cloudflare-env.d.ts` if generated.
5. Update any hardcoded URLs (`NEXT_PUBLIC_*`, `NEXTAUTH_URL`, OAuth callbacks, CORS origins, webhook URLs, sitemap/robots base URL) to `https://<PROJECT_SLUG>.dhyandev.sbs`. List external dashboards I must update by hand (Google OAuth, Stripe webhooks, Supabase/Firebase auth URLs, etc.).

## PHASE 3: Build and test locally

1. Run a clean install and the build. Fix errors (bundle size, unsupported Node APIs, edge incompatibilities) with the smallest possible change.
2. Run the local preview (`npm run preview` or `npx wrangler dev`). Test: home page, a deep route, an API route, static assets, images, 404 page, redirects, and any auth/database flow.
3. Do not continue to deploy while anything critical is broken. Fix first, then re-run.

## PHASE 4: Deploy and attach the subdomain

1. Deploy: `npm run deploy` (or `npx wrangler deploy`).
2. The `custom_domain: true` route makes Cloudflare create the DNS record and TLS certificate for `<PROJECT_SLUG>.dhyandev.sbs` automatically. Do not create a manual CNAME for it, and do not leave a conflicting existing DNS record for that hostname (if one exists, tell me and ask before deleting it).
3. Verify with `curl -I https://<PROJECT_SLUG>.dhyandev.sbs` (expect 200/30x with a valid certificate; allow a few minutes for propagation). Also open the `*.workers.dev` URL as a fallback check.
4. Smoke-test the same checklist as Phase 3 against the live URL.

## PHASE 5: Cleanup and safety

1. Do NOT delete the Vercel project or its domains. Leave it running until I confirm the Cloudflare version works.
2. Remove Vercel-only dependencies and files once the Cloudflare build is confirmed good: `@vercel/analytics`, `@vercel/speed-insights`, `@vercel/kv`, `vercel.json` (after porting its rules), the `.vercel/` folder.
3. Commit in clear steps and push the branch. Do not merge to `main` unless I say so.
4. Add or update `README.md` with a "Deployment" section: slug, URL, commands (`dev`, `preview`, `deploy`), required secrets, bindings, and the rollback plan.
5. If the project has Git-connected CI, offer to set up Cloudflare Workers Builds (connect repo, build command `npm run build`, deploy command `npx wrangler deploy`) so pushes auto-deploy.

## FINAL REPORT (keep it short)

- Slug and live URL, and whether it responds correctly
- Stack detected and adapter used
- Bindings created (KV/D1/R2/etc.) with names
- Secrets I still need to set, and external dashboards to update
- Anything that could not be migrated and why
- Rollback: the Vercel deployment is untouched, so remove the Worker route or point DNS back if needed

## RULES

- Never expose secret values in output, logs, or commits.
- Never run destructive commands (deleting Vercel projects, DNS records, D1/KV data, force-push) without asking me first.
- Prefer official docs and current adapter versions; check them before using any flag from memory.
- If a step fails twice with the same approach, stop, explain what you tried, and propose an alternative.
- Make the smallest code changes needed; do not refactor or redesign the app.
