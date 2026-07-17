import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { hallowSource } from "@hallow/workspace/packages/vite-plugin/dist/index.js";

export default defineConfig({
  plugins: [hallowSource(), react()],
});
