# FaceAttend.AI product website

## Goal
Build a polished, single-page product website for FaceAttend.AI using your uploaded brief, GitHub repository, and M13 screenshots as the references. The current home page is a template placeholder; this website will replace it.

## Visual direction
- Adapt M13’s oversized typography, translucent floating navigation, spacious editorial layouts, vibrant lime/pink/yellow feature tiles, and contrasting dark footer—not its branding or venture-capital content.
- Make **FaceAttend.AI** prominent in the first screen, with the supplied attendance-automation headline, supporting copy, and “Discover the Solution” / “Watch Demo” actions.
- Use original product-relevant imagery showing camera-based attendance, rather than embedding the reference screenshots or copying M13’s star background.
- Carry the reference’s visual rhythm through full-width sections, restrained borders, small corner radii, subtle transitions, and a compact mobile menu.

## Page content
1. **Hero and overview:** version badge, product introduction, traditional-attendance problems, and the contactless solution.
2. **Features:** webcam recognition, daily CSV logging, one-click email reports, desktop management, and local processing.
3. **Workflow and demo:** registration → training → recognition → export; click-to-play walkthrough using the video available in the repository, with loading and playback-error states.
4. **Technology and setup:** Python, OpenCV, Haar Cascade, LBPH, Tkinter, Pandas, Pillow, and SMTP; architecture diagram, clearly illustrative code, copyable installation commands, and the supplied user guide.
5. **Use cases and pricing:** universities, offices, and events; Open Source at ₹0 forever, Pro at ₹4,999/year, and custom Campus / Enterprise pricing.
6. **Developer, FAQ, roadmap, and contact:** supplied developer information, accurate offline/privacy answers, planned enhancements, and the contact form addressed to faceattentai@gmail.com.
7. **Footer and legal pages:** product links, MIT license reference, 2026 copyright, and separate Privacy and Terms draft pages. Clearly mark legal drafts as requiring review.

## Content accuracy and actions
- Use the supplied wording and repository facts without inventing testimonials, customer logos, benchmarks, or compliance certifications.
- Inspect the implementation before publishing any recognition-threshold claim; omit a numeric accuracy claim if evidence remains inconsistent.
- Keep benchmark values configurable and undisplayed until verified. Do not imply GDPR compliance from an unverified counter label.
- Mark liveness detection, Excel export, SMS, cloud sync, advanced analytics, and other capabilities not established by the repository as **planned**, not available features.
- Avoid describing LBPH histograms as encryption or irreversible hashes. Explain local storage and retained training images accurately.
- Wire source-code links to the correct repository and sales links to the supplied email. Keep the paid checkout explicitly unavailable until a real checkout URL is supplied; do not charge visitors or simulate a purchase.
- Add smooth anchor navigation with active-section highlighting, keyboard-accessible video and FAQ controls, and copy feedback.

## Contact form
- Use Lovable Cloud for secure message handling, server-side validation, spam protection, and message storage.
- Connect email delivery when sender-service credentials are available. Without those credentials, store the inquiry and report only that it was received—not that an email was sent.
- Include clear submitting, success, validation-error, and failure states. No visitor account is required.

## Technical implementation and verification
- Retain the existing TanStack Start, React, TypeScript, and Tailwind setup rather than switching to Next.js.
- Use focused section components, shared design-system controls, and semantic color/font tokens; store website media through Lovable Assets.
- Add the exact supplied home-page title and description, page-specific social metadata, SoftwareApplication structured data with truthful offers, a sitemap, and crawler configuration.
- Implement accessible labels, focus states, sufficient contrast, reduced-motion support, and lazy-loaded video/media.
- Test concrete pricing values, feature availability, and contact validation. Verify anchor navigation, demo playback, copy actions, contact submission and stored-message readback, and desktop/mobile layouts.
- Aim for strong loading and Lighthouse performance without promising a score before measurement.

## Launch dependencies
The site can be built with the supplied material. Real paid checkout needs your checkout URL; outbound contact emails need an email service and authorized sender credentials. Legal drafts, compliance claims, and planned paid capabilities must be reviewed before public launch.