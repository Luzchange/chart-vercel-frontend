import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CBRN Cell Health Risk Assessment (C2RAT)",
    short_name: "C2RAT",
    description:
      "Occupational and environmental health decision-support, exposure assessment, hazard intelligence, and educational suite.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#1e293b",
    orientation: "any",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["medical", "education", "productivity"],
  };
}
