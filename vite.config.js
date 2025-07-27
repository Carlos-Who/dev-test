import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: path.resolve(__dirname, 'client'),
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
