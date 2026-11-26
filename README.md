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

## License & Contact

MIT License. Developed by [Dhyandev](https://dhyandev.sbs) ([Bio Links](https://link.dhyandev.sbs)).
Contact: [dhyandevp@proton.me](mailto:dhyandevp@proton.me)
