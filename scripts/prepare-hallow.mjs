import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const hallowRoot = resolve(
  projectRoot,
  "node_modules/@hallow/workspace/packages"
);

const overlayOutput = resolve(hallowRoot, "overlay/dist/index.js");
const pluginOutput = resolve(hallowRoot, "vite-plugin/dist/index.js");

await Promise.all([
  mkdir(dirname(overlayOutput), { recursive: true }),
  mkdir(dirname(pluginOutput), { recursive: true }),
]);

await Promise.all([
  build({
    bundle: true,
    entryPoints: [resolve(hallowRoot, "overlay/src/index.ts")],
    external: ["react", "react-dom", "react/jsx-runtime"],
    format: "esm",
    jsx: "automatic",
    logLevel: "warning",
    outfile: overlayOutput,
    platform: "browser",
    target: "es2020",
  }),
  build({
    bundle: true,
    entryPoints: [resolve(hallowRoot, "vite-plugin/src/index.ts")],
    format: "esm",
    logLevel: "warning",
    outfile: pluginOutput,
    packages: "external",
    platform: "node",
    target: "node22",
  }),
]);
