import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/styles.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faceattend.ai";

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
  authors: [{ name: "Dhyandev" }],
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
    icon: "/favicon.ico",
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
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
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
              },
            }),
          }}
        />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased selection:bg-lime selection:text-tile-foreground">
        {children}
      </body>
    </html>
  );
}
