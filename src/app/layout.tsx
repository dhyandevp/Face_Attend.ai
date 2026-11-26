import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faceattendai.dhyandev.sbs";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FaceAttend.AI | Enterprise Biometric Intelligence",
  description:
    "Next-generation AI Face Recognition Attendance System. Automated, secure, and contactless solutions for modern institutions.",
  keywords: [
    "Face Recognition",
    "Attendance Automation",
    "AI Attendance",
    "Biometrics",
    "OpenCV",
    "Python",
  ],
  authors: [{ name: "Dhyandev", url: "https://dhyandev.sbs" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FaceAttend.AI",
    title: "FaceAttend.AI | Enterprise Biometric Intelligence",
    description:
      "Next-generation AI Face Recognition Attendance System. Automated, secure, and contactless solutions for modern institutions.",
    images: [
      {
        url: "/assets/faceattend-demo.jpg",
        width: 1200,
        height: 630,
        alt: "FaceAttend.AI Desktop System Walkthrough",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FaceAttend.AI | Enterprise Biometric Intelligence",
    description:
      "Next-generation AI Face Recognition Attendance System. Automated, secure, and contactless solutions for modern institutions.",
    images: ["/assets/faceattend-demo.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "FaceAttend.AI",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Desktop with Python 3.9+",
              description:
                "Next-generation AI Face Recognition Attendance System. Automated, secure, and contactless solutions for modern institutions.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
                url: "https://github.com/dhyandevp/FaceAttend.ai",
              },
              author: {
                "@type": "Person",
                name: "Dhyandev",
                url: "https://dhyandev.sbs",
                sameAs: ["https://link.dhyandev.sbs", "https://github.com/dhyandevp"],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased selection:bg-primary/15 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
