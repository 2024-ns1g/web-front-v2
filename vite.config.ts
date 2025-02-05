import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // define: {
  //   'import.meta.env.VITE_API_HOST': JSON.stringify(process.env.VITE_API_HOST || ''),
  //   'import.meta.env.VITE_API_DEFAULT_TIMEOUT': JSON.stringify(process.env.VITE_API_DEFAULT_TIMEOUT || ''),
  //   'import.meta.env.VITE_LOG_LEVEL': JSON.stringify(process.env.VITE_LOG_LEVEL || ''),
  //   'import.meta.env.VITE_MIN_LOG_LEVEL': JSON.stringify(process.env.VITE_MIN_LOG_LEVEL || ''),
  // }
})
