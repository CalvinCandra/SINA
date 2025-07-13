import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      fastRefresh: false, // ✅ Matikan fitur yang sering bikin Chrome crash
    }),
  ],
  server: {
    port: 5173, // pastikan port tetap (opsional)
  },
  build: {
    sourcemap: false,
  },
});
