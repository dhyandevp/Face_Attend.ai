import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FaceAttend.AI | Enterprise Biometric Intelligence",
    short_name: "FaceAttend.AI",
    description:
      "Next-generation AI Face Recognition Attendance System. Automated, secure, and contactless solutions for modern institutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0d14",
    theme_color: "#0284c7",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
