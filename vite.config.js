import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      VitePWA({
        base: "/",
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,json}"],
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            // env api url
            {
              urlPattern: new RegExp(
                "^https://next.geniusocean.xyz/backend/api/*"
              ),
              handler: "NetworkFirst",

              options: {
                cacheName: "api-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                },
              },
            },
          ],
        },

        manifest: {
          name: "Medical",
          short_name: "Medical",
          start_url: "/",
          display: "standalone",
          background_color: "#ffffff",
          description: "Best App Ever",
          icons: [
            {
              src: "favicon.png",
              sizes: "64x64 32x32 24x24 16x16",
              type: "image/x-icon",
            },
            {
              src: "logo192.png",
              type: "image/png",
              sizes: "192x192",
            },
            {
              src: "logo512.png",
              type: "image/png",
              sizes: "512x512",
            },
          ],
        },
      }),
    ],
  };
});
