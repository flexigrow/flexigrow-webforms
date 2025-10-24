import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { readdirSync, statSync } from "fs";

// Automatically discover all web components
function getWebComponentEntries() {
  const componentsDir = path.resolve(__dirname, "src/components");
  const entries: Record<string, string> = {};

  try {
    const files = readdirSync(componentsDir);
    files.forEach((file) => {
      const filePath = path.join(componentsDir, file);
      const stat = statSync(filePath);

      if (stat.isDirectory()) {
        // Look for standard web-component.tsx
        const webComponentFile = path.join(filePath, "web-component.tsx");
        try {
          statSync(webComponentFile);
          entries[file] = webComponentFile;
        } catch {
          // web-component.tsx doesn't exist in this directory
        }

        // Look for react-to-webcomponent version
        const webComponentR2WFile = path.join(
          filePath,
          "web-component-r2w.tsx"
        );
        try {
          statSync(webComponentR2WFile);
          entries[`${file}R2W`] = webComponentR2WFile;
        } catch {
          // web-component-r2w.tsx doesn't exist in this directory
        }
      }
    });
  } catch {
    // components directory doesn't exist yet
  }

  return entries;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: getWebComponentEntries(),
      external: [],
      output: {
        // Create ES modules format for each entry
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
      },
    },
    cssCodeSplit: false,
    outDir: "dist",
  },
});
