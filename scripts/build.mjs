import { build } from "vite";

const hallowEnabled = process.env.VITE_HALLOW === "1";

if (hallowEnabled) {
  for (const name of ["VITE_HALLOW_ENDPOINT", "VITE_HALLOW_PROJECT_KEY"]) {
    if (!process.env[name]?.trim()) {
      throw new Error(`${name} is required when VITE_HALLOW=1`);
    }
  }
}

await build({ mode: hallowEnabled ? "preview" : "production" });
