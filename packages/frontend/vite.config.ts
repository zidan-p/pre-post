import { defineConfig, loadEnv, UserConfigFn } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const option: UserConfigFn = (prop) => {
  const env = loadEnv(prop.mode, process.cwd(), "");

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
        "@page" : path.resolve(__dirname, './src/page'),
        "@services" : path.resolve(__dirname, './src/services'),
        "@shared" : path.resolve(__dirname, './src/shared'),
        "@assets" : path.resolve(__dirname, './src/shared/assets'),
        "@widget" : path.resolve(__dirname, './src/widget'),
        "@process" : path.resolve(__dirname, './src/process'),
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(option)
