import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { hallowSource } from "./vendor/hallow/vite-plugin.js";

export default defineConfig({
  plugins: [process.env.VITE_HALLOW === "1" && hallowSource(), react()].filter(
    Boolean
  ),
});
