# FaceAttend.AI | Enterprise Biometric Intelligence

Next-generation AI Face Recognition Attendance System. Automated, secure, and contactless solutions for modern institutions.

## Features

- **Precision AI**: Haar Cascade detection and LBPH recognition bringing computer vision to attendance.
- **Real-Time Tracking**: Fast face recognition directly from a webcam feed.
- **Local-First & Secure**: Core recognition runs locally with no external cloud dependency.
- **Automated Reporting**: Daily CSV logs and one-click administrative email reports.

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + Radix UI Primitives (shadcn/ui style)
- **Database:** PostgreSQL with Drizzle ORM
- **Validation:** Zod schemas + typed environment configuration (`@t3-oss/env-nextjs`)
- **Testing:** Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (local or hosted, e.g. Neon)

### Installation

```bash
# Clone the repository
git clone https://github.com/dhyandevp/faceattend.git
cd faceattend

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Run database migrations
pnpm db:push

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build production Next.js application
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint checks
- `pnpm test`: Run Vitest unit tests
- `pnpm db:generate`: Generate Drizzle migrations
- `pnpm db:push`: Push schema changes to database
- `pnpm migrate:data`: Migrate historical submissions from legacy export
- `pnpm preview`: Build and preview the Cloudflare Worker locally with Wrangler
- `pnpm deploy`: Build and deploy the application to Cloudflare Workers
- `pnpm cf-typegen`: Generate Cloudflare binding types

## Deployment (Cloudflare Workers)

This project is deployed to **Cloudflare Workers** using `@opennextjs/cloudflare`.

- **Project Slug:** `faceattend-ai`
- **Live URL:** [https://faceattendai.dhyandev.sbs](https://faceattendai.dhyandev.sbs) (alias: [https://faceattend-ai.dhyandev.sbs](https://faceattend-ai.dhyandev.sbs))

### Deployment Commands

```bash
# Run local development with Cloudflare bindings
pnpm dev

# Build and preview locally with Wrangler
pnpm preview

# Build and deploy to Cloudflare Workers
pnpm deploy
```

### Environment Variables & Secrets

- `NEXT_PUBLIC_SITE_URL`: Set to `https://faceattendai.dhyandev.sbs` in `wrangler.jsonc` (`vars`).
- Local variables can be configured in `.dev.vars` (see `.dev.vars.example`).
- Secrets (if needed in the future) can be added via:
  ```bash
  npx wrangler secret put <SECRET_NAME>
  ```

### Bindings & Architecture

- **Worker Name:** `faceattend-ai`
- **Static Assets:** Static assets and chunks served via Cloudflare Workers Static Assets (`ASSETS` binding).
- **Custom Domain:** `faceattend-ai.dhyandev.sbs` (`custom_domain: true` route).
- **Worker Self Reference:** `WORKER_SELF_REFERENCE` binding to handle internal ISR revalidation.

### Rollback Plan

The existing Vercel deployment and DNS configurations remain untouched as a fail-safe:
1. If an immediate rollback is needed, remove the custom domain trigger in `wrangler.jsonc` or Cloudflare Dashboard under **Workers & Pages -> faceattend-ai -> Settings -> Triggers / Custom Domains**.
2. Re-point the DNS record for `faceattend-ai.dhyandev.sbs` or your domain back to Vercel (`cname.vercel-dns.com`).

## License & Contact

MIT License. Developed by [Dhyandev](https://dhyandev.sbs) ([Bio Links](https://link.dhyandev.sbs)).
Contact: [dhyandevp@proton.me](mailto:dhyandevp@proton.me)
