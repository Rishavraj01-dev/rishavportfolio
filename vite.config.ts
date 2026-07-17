import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ["VITE_", "NEXT_PUBLIC_"]);
  const googleVerification = (
    env.VITE_GOOGLE_SITE_VERIFICATION || env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ""
  ).trim();

  return {
    envPrefix: ["VITE_", "NEXT_PUBLIC_"],
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "portfolio-seo-html-env",
        transformIndexHtml(html) {
          if (!googleVerification || html.includes('name="google-site-verification"')) return html;
          return html.replace(
            "</head>",
            `    <meta name="google-site-verification" content="${escapeHtml(googleVerification)}" />
  </head>`
          );
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return undefined;
            if (id.includes("react-dom") || id.includes("react/") || id.includes("scheduler")) return "react-core";
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("lucide-react") || id.includes("react-icons")) return "icons";
            if (id.includes("@radix-ui")) return "radix-ui";
            return "vendor";
          },
        },
      },
    },
    server: {
      port: 5000,
      host: "0.0.0.0",
    },
    preview: {
      port: 5000,
      host: "0.0.0.0",
    },
  };
});
