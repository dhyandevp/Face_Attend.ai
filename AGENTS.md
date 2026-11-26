# FaceAttend.AI — Project Guidelines

## Website Architecture

- Keep product data and validation in a browser-safe shared module (`src/lib/product.ts`) and presentation in focused site components, so pricing rules and product schemas can be tested without rendering pages.
- Use a validated server route handler for contact inquiries (`/api/contact`) with Zod schema verification and a honeypot before persisting to PostgreSQL via Drizzle ORM; never expose inquiry reads to public visitors.
- Keep the home page as the anchored product experience and legal content in separate App Router routes (`/privacy`, `/terms`) with their own metadata.
