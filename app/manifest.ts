import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Universo Trabajo",
    short_name: "UT",
    description: "Conectando proveedores de servicios con usuarios",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1E88E5",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
