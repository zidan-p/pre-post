import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), "");

  return  {
    plugins: [react()],
    server: {
      port: Number(env.PORT)
    },
    resolve: {
      alias: {
        "@" : path.resolve(__dirname, './src/'),
        "@app" : path.resolve(__dirname, './src/app'),
        "@entities" : path.resolve(__dirname, './src/entities'),
        "@features" : path.resolve(__dirname, './src/features'),
        "@pages" : path.resolve(__dirname, './src/pages'),
        "@services" : path.resolve(__dirname, './src/services'),
        "@shared" : path.resolve(__dirname, './src/shared'),
        "@assets" : path.resolve(__dirname, './src/shared/assets'),
        "@widgets" : path.resolve(__dirname, './src/widgets'),
        "@process" : path.resolve(__dirname, './src/process'),
      }
    }
  }
})

