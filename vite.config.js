import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    VitePWA({
      includeAssets: ['vite.svg'],
      manifest: {
        name: 'Colorkrew FOCUS',
        short_name: 'ck-focus',
        description: 'Next Gen Tadasi',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'vite.svg',
            sizes: '256x256',
            type: 'image/png'
          },
        ]
      },
    registerType: 'autoUpdate', 
    devOptions: {
      enabled: true,
    },
    injectRegister: 'auto',
  }
)],
  server: {
    allowedHosts: ["arriving-dinosaur-popular.ngrok-free.app", "tigers-removal-delivering-dos.trycloudflare.com"]
  }
})
