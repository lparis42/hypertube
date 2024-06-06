import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		react(),
		viteTsconfigPaths(),
    svgrPlugin(),
	],
  // For development purposes
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://localhost:443',
        changeOrigin: true,
        ws: true,
        secure: false, // To accept self-signed certificate
      },
    },
    host: true
  },
})
