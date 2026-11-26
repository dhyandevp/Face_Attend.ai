import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/site/site-controls";
import { developerBioUrl, developerEmail, developerWebsite } from "@/lib/product";

export const metadata: Metadata = {
  title: "Privacy — FaceAttend.AI",
  description:
    "Privacy guidelines and information handling practices for the FaceAttend.AI website and desktop application.",
  openGraph: {
    title: "Privacy — FaceAttend.AI",
    description: "Privacy policy draft for FaceAttend.AI.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy — FaceAttend.AI",
    description: "Privacy policy draft for FaceAttend.AI.",
  },
};

export default function Privacy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/">
        <Brand />
      </Link>
      <p className="eyebrow mt-16 text-muted-foreground">Legal draft · requires owner review</p>
      <h1 className="text-5xl mt-4 mb-10 font-medium">Privacy</h1>
      <div className="space-y-6 leading-7 text-foreground/90">
        <p>
          This draft describes the website’s current handling of inquiries. It is not a finalized
          legal policy or a compliance certification.
        </p>
        <h2 className="text-2xl font-medium mt-8 mb-4">Website inquiries</h2>
        <p>
          The contact form collects your name, email address, and message. These are stored
          privately in our secure database to handle your inquiry. Do not include face images,
          attendance records, or sensitive personal information in your message.
        </p>
        <h2 className="text-2xl font-medium mt-8 mb-4">Local attendance application</h2>
        <p>
          The core desktop product processes face images locally. Registration images, student
          details, trained LBPH histograms, and attendance CSV files may remain on the operating
          machine. Institutional operators are responsible for consent, access controls, retention,
          and applicable privacy requirements.
        </p>
        <h2 className="text-2xl font-medium mt-8 mb-4">Contact</h2>
        <p>
          For questions or requests concerning your inquiry, email{" "}
          <a className="underline text-primary" href={`mailto:${developerEmail}`}>
            {developerEmail}
          </a>{" "}
          or visit{" "}
          <a
            className="underline text-primary"
            href={developerWebsite}
            target="_blank"
            rel="noreferrer"
          >
            dhyandev.sbs
          </a>{" "}
          /{" "}
          <a
            className="underline text-primary"
            href={developerBioUrl}
            target="_blank"
            rel="noreferrer"
          >
            link.dhyandev.sbs
          </a>
          . Retention periods and a complete rights process must be finalized by the owner before
          launch.
        </p>
      </div>
      <Link href="/" className="inline-block mt-12 text-primary hover:underline">
        ← Back to FaceAttend.AI
      </Link>
    </main>
  );
}
