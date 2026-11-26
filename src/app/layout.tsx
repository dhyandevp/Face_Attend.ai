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
  title: {
    default: "FaceAttend.AI | Enterprise Biometric Intelligence",
    template: "%s | FaceAttend.AI",
  },
  description:
    "Next-generation AI Face Recognition Attendance System. Automated, secure, and contactless biometric attendance tracking powered by computer vision.",
  applicationName: "FaceAttend.AI",
  keywords: [
    "Face Recognition",
    "Attendance Automation",
    "AI Attendance System",
    "Biometric Attendance",
    "Computer Vision",
    "OpenCV",
    "Python Biometrics",
    "Contactless Attendance",
    "Real-time Face Detection",
    "Haar Cascade",
    "LBPH Recognizer",
    "Modern Campus Attendance",
    "Student Attendance Tracking",
  ],
  authors: [{ name: "Dhyandev", url: "https://dhyandev.sbs" }],
  creator: "Dhyandev",
  publisher: "FaceAttend.AI",
  category: "Technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FaceAttend.AI",
    title: "FaceAttend.AI | Enterprise Biometric Intelligence",
    description:
      "Next-generation AI Face Recognition Attendance System. Automated, secure, and contactless biometric attendance tracking powered by computer vision.",
    images: [
      {
        url: "/assets/faceattend-demo.jpg",
        width: 1200,
        height: 630,
        alt: "FaceAttend.AI - AI Biometric Attendance System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FaceAttend.AI | Enterprise Biometric Intelligence",
    description:
      "Next-generation AI Face Recognition Attendance System. Automated, secure, and contactless biometric attendance tracking powered by computer vision.",
    images: ["/assets/faceattend-demo.jpg"],
    creator: "@dhyandev",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "FaceAttend.AI",
        description: "Next-generation AI Face Recognition Attendance System.",
        publisher: {
          "@type": "Person",
          name: "Dhyandev",
          url: "https://dhyandev.sbs",
          sameAs: ["https://link.dhyandev.sbs", "https://github.com/dhyandevp"],
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "FaceAttend.AI",
        applicationCategory: "SecurityApplication, EducationalApplication",
        operatingSystem: "Desktop with Python 3.9+",
        url: siteUrl,
        image: `${siteUrl}/assets/faceattend-demo.jpg`,
        screenshot: `${siteUrl}/assets/faceattend-demo.jpg`,
        description:
          "Next-generation AI Face Recognition Attendance System. Automated, secure, and contactless biometric attendance tracking powered by computer vision.",
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
        featureList: [
          "Haar Cascade Face Detection",
          "LBPH Face Recognition",
          "Real-time webcam attendance capture",
          "Automated daily CSV logs and email reports",
          "Local-first edge processing",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased selection:bg-primary/15 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
