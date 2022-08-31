import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            // 请求代理
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ""),
            },
            // WebSocket 代理
            "/ws": {
                target: "ws://localhost:8080",
                ws: true,
            },
        },
    },
    resolve: {
        alias: [
            {find: "@", replacement: "/src"}
        ]
    },
    plugins: [
        react(),
    ],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    "root-entry-name": "variable",
                },
                javascriptEnabled: true,
            }
        }
    }
});
