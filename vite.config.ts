import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), /*basicSsl(),*/ svgr({
    svgrOptions: {
      icon: true,
    },
  })],
  server: {
    proxy: {
      "/apis": {
        target: "http://20.223.94.90:8080/apis",
        // target: "http://20.105.26.194:8080/apis",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, ''),
      }
    }
  }
})
