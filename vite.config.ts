import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@containers": "/src/containers",
      "@controllers": "/src/controllers",
      "@hooks": "/src/hooks",
      "@interfaces": "/src/interfaces",
      "@models": "/src/models",
      "@routes": "/src/routes",
      "@services": "/src/services",
      "@stores": "/src/stores",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
      "@views": "/src/views",
    },
  },
});
