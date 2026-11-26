# FaceAttend.AI — Project Guidelines

## Website Architecture

- Keep product data and validation in a browser-safe shared module (`src/lib/product.ts`) and presentation in focused site components, so pricing rules and product schemas can be tested without rendering pages.
- Direct contact inquiries to developer channels (direct email, portfolio website, and social links) without unnecessary database or form processing overhead.
- Keep the home page as the anchored product experience and legal content in separate App Router routes (`/privacy`, `/terms`) with their own metadata.
