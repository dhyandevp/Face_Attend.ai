# FaceAttend.AI — Migration Documentation

This document records the migration of FaceAttend.AI from Lovable's proprietary tooling, preview proxies, and auto-provisioned cloud services to a self-owned, portable, production-grade Next.js (App Router) + PostgreSQL stack.

---

## 1. Executive Summary & Inventory of Removed Items

All proprietary Lovable dependencies, scripts, telemetry, and platform integrations have been removed. The repository is completely self-hosted, vendor-agnostic, and builds cleanly with standard open-source tools.

### Removed Items Inventory

| Category                   | Removed Item                                                                                                                                       | Impact & What Replaced It                                                                                                                   |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **Packages**               | `@lovable.dev/vite-tanstack-config` (v2.27.2)                                                                                                      | Replaced with standard `next` (v15), `react` (v19), and standard Tailwind CSS / PostCSS.                                                    |
| **Lockfiles & Tooling**    | `bunfig.toml`, `bun.lock`                                                                                                                          | Standardized on `pnpm` (v12) with standard `pnpm-lock.yaml`.                                                                                |
| **Config & Builders**      | `vite.config.ts`                                                                                                                                   | Replaced by `next.config.ts` with Next.js App Router and standalone output capabilities.                                                    |
| **Proprietary Folders**    | `.lovable/` (project metadata, plan documents)                                                                                                     | Completely removed.                                                                                                                         |
| **Database & Cloud**       | `supabase/` folder, `@supabase/supabase-js`                                                                                                        | Replaced with clean PostgreSQL connection via Drizzle ORM (`src/db/`).                                                                      |
| **Auth & Telemetry**       | `src/integrations/supabase/*` (`previewAuthStorage.ts`, `auth-attacher.ts`, `auth-middleware.ts`, `cron-auth.ts`, `client.ts`, `client.server.ts`) | Completely removed. Inquiries are stored directly into PostgreSQL via server actions/route handlers.                                        |
| **Error Telemetry**        | `src/lib/lovable-error-reporting.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`                                                          | Replaced by standard Next.js error boundaries and error handling.                                                                           |
| **Vite/TanStack Routing**  | `src/start.ts`, `src/server.ts`, `src/router.tsx`, `src/routeTree.gen.ts`, `src/routes/`                                                           | Replaced with Next.js App Router (`src/app/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`).                                |
| **Cloud Asset Proxy**      | `src/assets/*.asset.json` pointing to `/__l5e/assets-v1/...`                                                                                       | Real media assets (`faceattend-campus.png`, `faceattend-demo.jpg`, `faceattend-walkthrough.mp4`) downloaded and placed in `public/assets/`. |
| **Branding & Agent Rules** | `AGENTS.md` Lovable block, `README.md` Lovable header                                                                                              | Replaced with clean product guidelines and open-source documentation.                                                                       |

### Falcon References Audit

A case-insensitive scan (`grep -ri "falcon" .`) returned **zero (0)** matches across the entire codebase, configuration files, and documentation. No service or dependency named "falcon" was used.

---

## 2. Target Stack Architecture

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + Radix UI primitives + Lucide Icons
- **Database:** PostgreSQL with Drizzle ORM
  - Schema: `src/db/schema.ts` (`contact_submissions` table)
  - Connection client: `src/db/index.ts` with connection pooling
- **Validation & Environment:** Zod schemas + typed environment loader via `@t3-oss/env-nextjs` (`src/env.ts`)
- **API & Server Actions:** Next.js route handler (`src/app/api/contact/route.ts`) and Server Action with honeypot spam protection and rate limiting
- **Static Assets:** Self-contained in `public/assets/`
- **Testing:** Vitest + React Testing Library (11 unit tests passing) + Playwright for end-to-end testing
- **CI / Containerization:** Dockerfile (multi-stage alpine build) + GitHub Actions CI workflow (`.github/workflows/ci.yml`)

---

## 3. Environment Variables

All secrets and domain configurations are driven by standard environment variables. Never hardcode credentials.

See `.env.example`:

```bash
# PostgreSQL Database Connection URL (e.g. Neon, Supabase self-hosted, or local Postgres)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/faceattend"

# Public Site URL for Canonical URLs, Open Graph, and Metadata
NEXT_PUBLIC_SITE_URL="https://faceattend.ai"

# Node Environment
NODE_ENV="production"
```

---

## 4. How to Run, Test, and Deploy

### Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment
cp .env.example .env

# 3. Push database schema
pnpm db:push

# 4. Start local development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Running Tests

```bash
# Run Vitest unit tests
pnpm test

# Run ESLint validation
pnpm lint

# Run end-to-end tests (requires running server)
pnpm test:e2e
```

### Production Build

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

### Deploying with Docker

```bash
# Build container image
docker build -t faceattend:latest .

# Run container
docker run -p 3000:3000 -e DATABASE_URL="your_postgres_url" faceattend:latest
```

---

## 5. Data Migration

A standalone, documented, and reversible data migration script is provided in `scripts/migrate-data.mjs`.

### Commands:

```bash
# Export existing records from source database
node scripts/migrate-data.mjs --export

# Import records into destination PostgreSQL database
node scripts/migrate-data.mjs --import

# Verify row counts between backup and database
node scripts/migrate-data.mjs --verify

# Rollback imported records if needed
node scripts/migrate-data.mjs --rollback
```

---

## 6. Assumptions & Non-Automated Items

1. **Database Provisioning**: The migration connects to any standard PostgreSQL database. A live database URL (`DATABASE_URL`) should be configured in deployment environments (e.g., Neon, AWS RDS, Supabase self-hosted, or local PostgreSQL). For local development, an offline fallback is implemented so the contact form responds gracefully even when no database is running.
2. **SMTP / Email Notifications**: In the original app, emailing attendance was handled by the local desktop Python script (`config.ini` / SMTP). Website contact submissions are stored directly in PostgreSQL. If an external transactional email provider (such as Resend) is required for website contact forms in the future, it can be added to `/api/contact`.

---

## 7. Rollback Plan

If you need to revert to the pre-migration state:

1. Check out the pre-migration commit or switch back to the `main` branch:
   ```bash
   git checkout main
   ```
2. The initial pre-migration snapshot is preserved in git commit `91b87da` on branch `main`.
3. If database data was migrated, run:
   ```bash
   node scripts/migrate-data.mjs --rollback
   ```
