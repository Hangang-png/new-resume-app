import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/new-resume-app/',   // ← 这里改为 new-resume-app
  plugins: [react()],
});