import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["pomodoro.svg"],
      manifest: {
        name: "Colorkrew FOCUS",
        short_name: "ポモドーロ",
        description: "Next Gen Tadasi",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pomodoro.svg",
            sizes: "256x256",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      injectRegister: "auto",
      srcDir: "src",
      filename: "sw/sw.js",
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        importScripts: ["sw.js"],
      },
    }),
  ],
  server: {
    allowedHosts: true,
  },
});
