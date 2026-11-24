import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { createReadStream, existsSync, cpSync } from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer, type PreviewServer } from "vite";

const root = import.meta.dirname;
const storageDirectory = path.resolve(root, "assets/manus-storage");
const outputDirectory = path.resolve(root, "dist/public");
const mediaTypes: Record<string, string> = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".gif": "image/gif",
  ".json": "application/json", ".pdf": "application/pdf", ".mp4": "video/mp4",
};

// Media stays outside client/public and client/src. These original URL paths
// are served locally without a Manus account, proxy, or private credential.
function packagedStorage(): Plugin {
  function configure(server: ViteDevServer | PreviewServer) {
    server.middlewares.use("/manus-storage", (req, res, next) => {
      let relativePath: string;
      try { relativePath = decodeURIComponent((req.url ?? "/").split("?")[0]).replace(/^\/+/, ""); }
      catch { res.statusCode = 400; res.end("Invalid asset path"); return; }
      const file = path.resolve(storageDirectory, relativePath);
      const relative = path.relative(storageDirectory, file);
      if (!relative || relative.startsWith("..") || path.isAbsolute(relative) || !existsSync(file)) {
        next(); return;
      }
      res.setHeader("Content-Type", mediaTypes[path.extname(file).toLowerCase()] ?? "application/octet-stream");
      const stream = createReadStream(file);
      stream.on("error", () => { if (!res.headersSent) res.statusCode = 404; res.end(); });
      stream.pipe(res);
    });
  }
  return {
    name: "nwca-packaged-assets",
    configureServer: configure,
    configurePreviewServer: configure,
    closeBundle() {
      if (existsSync(storageDirectory)) {
        cpSync(storageDirectory, path.join(outputDirectory, "manus-storage"), { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), packagedStorage()],
  root: path.resolve(root, "client"),
  envDir: root,
  resolve: { alias: {
    "@": path.resolve(root, "client/src"),
    "@shared": path.resolve(root, "shared"),
    "@assets": path.resolve(root, "attached_assets"),
  } },
  build: {
    outDir: outputDirectory,
    emptyOutDir: true,
    rollupOptions: { output: { manualChunks: {
      vendor: ["react", "react-dom"], router: ["wouter"], icons: ["lucide-react"],
    } } },
  },
  server: { port: 3000, host: "127.0.0.1" },
  preview: { port: 4173, host: "127.0.0.1" },
});
