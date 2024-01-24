//  针对我们的vite项目，我们需要在根目录下创建一个vite.config.js文件，用于配置vite的一些配置项。

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9090,
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
