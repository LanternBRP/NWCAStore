import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Type declarations are emitted first by tsconfig.build.json. Keep them when
    // Vite writes the JavaScript library artifact into the same dist directory.
    emptyOutDir: false,
    lib: {
      entry: "src/extension-entry.tsx",
      formats: ["es"],
      fileName: "nwca-lantern-tenant-extension",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-dom/client"],
    },
    sourcemap: true,
  },
});
