// https://github.com/vitejs/vite/discussions/3448
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths'
// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  // https://github.com/jpuri/react-draft-wysiwyg/issues/1317
  base: process.env.VITE_APP_BASE_NAME,
  define: {
    global: 'window'
  },
  server: {
    port: 5174,
  },
});
