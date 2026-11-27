import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/site/site-controls";
import { developerBioUrl, developerEmail, developerWebsite } from "@/lib/product";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Draft terms for the FaceAttend.AI product website, open-source code, and planned editions.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service — FaceAttend.AI",
    description: "Terms of service and planned edition availability for FaceAttend.AI.",
    type: "website",
    url: "/terms",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service — FaceAttend.AI",
    description: "Terms of service and planned edition availability for FaceAttend.AI.",
  },
};

export default function Terms() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/">
        <Brand />
      </Link>
      <h1 className="text-5xl mt-16 mb-3 font-medium">Terms</h1>
      <p className="text-sm text-muted-foreground mb-10">Legal draft · requires owner review</p>
      <div className="space-y-6 leading-7 text-foreground/90">
        <p>This is a placeholder for owner-reviewed terms, not a finalized agreement.</p>
        <h2 className="text-2xl font-medium mt-8 mb-4">Product information</h2>
        <p>
          This website describes FaceAttend.AI and distinguishes current repository capabilities
          from planned enhancements. Benchmark accuracy, speed, and regulatory compliance have not
          been independently verified.
        </p>
        <h2 className="text-2xl font-medium mt-8 mb-4">Source and planned editions</h2>
        <p>
          The product brief identifies the project as MIT open source; review the repository’s
          license materials before redistribution. Paid editions and listed planned capabilities are
          proposals. No payment is collected on this website, and purchasing, support, cancellation,
          and refund terms are not yet established.
        </p>
        <h2 className="text-2xl font-medium mt-8 mb-4">Responsible deployment</h2>
        <p>
          Institutions must assess consent, data handling, hardware suitability, and applicable
          requirements before deploying biometric attendance. Recognition output should not be
          treated as an infallible attendance record.
        </p>
        <p className="mt-8">
          Questions:{" "}
          <a className="underline text-primary" href={`mailto:${developerEmail}`}>
            {developerEmail}
          </a>{" "}
          (Website:{" "}
          <a
            className="underline text-primary"
            href={developerWebsite}
            target="_blank"
            rel="noreferrer"
          >
            dhyandev.sbs
          </a>
          , Links:{" "}
          <a
            className="underline text-primary"
            href={developerBioUrl}
            target="_blank"
            rel="noreferrer"
          >
            links.dhyandev.sbs
          </a>
          ).
        </p>
      </div>
      <Link href="/" className="inline-block mt-12 text-primary hover:underline">
        ← Back to FaceAttend.AI
      </Link>
    </main>
  );
}
