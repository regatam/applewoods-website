import { clientContent } from "../src/content/client.js";
import { smcopyContent } from "../src/content/smcopy.js";

function shape(obj) {
  if (Array.isArray(obj)) return `[${obj.length}]`;
  if (obj && typeof obj === "object") {
    return "{" + Object.keys(obj).sort().map((k) => `${k}:${shape(obj[k])}`).join(",") + "}";
  }
  return "s";
}
if (shape(clientContent) !== shape(smcopyContent)) {
  console.error("Content shape mismatch between client and smcopy.");
  process.exit(1);
}
console.log("Content shape OK.");
