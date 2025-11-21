// @ts-check
import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [tailwindcss()],
    build: {
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks
            "react-vendor": ["react", "react-dom"],
            nanostores: ["nanostores", "@nanostores/react"],
          },
        },
      },
    },
  },

  integrations: [react()],

  // Enable compression
  compressHTML: true,

  // Build optimizations
  build: {
    inlineStylesheets: "auto",
  },
});
