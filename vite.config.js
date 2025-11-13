import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [react()],
    base: '/clock/'  // GitHub Pages 部署路径
}); 