import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@mods": path.resolve(__dirname, "src/components/Modules"),
      "@layouts": path.resolve(__dirname, "src/components/Layouts")
    }
  }
})


//runtime setting dll