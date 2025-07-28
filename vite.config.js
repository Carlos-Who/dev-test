import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    root: path.resolve(__dirname, 'client'),
    plugins: [
        tailwindcss(),
    ],
    server: {
        port: 5173,
        proxy: {
            '/auth': 'http://localhost:3000',
            '/user': 'http://localhost:3000'
        }
    },
    build: {
        outDir: path.resolve(__dirname, 'dist')
    }
});
