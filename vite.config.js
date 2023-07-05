import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  dotenv.config({ path: `.env.${mode}` });

  return {
    plugins: [vue()],
  };
});
