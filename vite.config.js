import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [react()],
    base: '/'  // Vercel 部署使用根路径
}); 