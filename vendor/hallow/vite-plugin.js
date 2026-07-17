// packages/vite-plugin/src/index.ts
import { transformSync } from "@babel/core";
import path from "node:path";
var defaultInclude = /\.[jt]sx$/;
function sourceAttributePlugin(sourceFile) {
  return {
    name: "hallow-source-attribute",
    visitor: {
      JSXOpeningElement(path2) {
        if (!path2.node.loc) return;
        const alreadyStamped = path2.node.attributes.some(
          (attribute) => attribute.type === "JSXAttribute" && attribute.name.type === "JSXIdentifier" && attribute.name.name === "data-hallow-source"
        );
        if (alreadyStamped) return;
        path2.node.attributes.push({
          type: "JSXAttribute",
          name: { type: "JSXIdentifier", name: "data-hallow-source" },
          value: {
            type: "StringLiteral",
            value: `${sourceFile}:${path2.node.loc.start.line}`
          }
        });
      }
    }
  };
}
function hallowSource(options = {}) {
  let projectRoot = options.root ? path.resolve(options.root) : process.cwd();
  let enabled = false;
  const include = options.include ?? defaultInclude;
  return {
    name: "hallow-source",
    enforce: "pre",
    configResolved(config) {
      projectRoot = options.root ? path.resolve(options.root) : config.root;
      enabled = config.command === "serve" || config.mode === "preview";
    },
    transform(code, id) {
      const cleanId = id.split("?", 1)[0];
      if (!enabled || cleanId.includes("node_modules") || !include.test(cleanId)) {
        return null;
      }
      const relativeFile = path.relative(projectRoot, cleanId).split(path.sep).join("/");
      const result = transformSync(code, {
        ast: false,
        babelrc: false,
        code: true,
        configFile: false,
        filename: cleanId,
        parserOpts: {
          plugins: ["jsx", "typescript"],
          sourceType: "module"
        },
        plugins: [sourceAttributePlugin(relativeFile)],
        sourceMaps: true,
        sourceFileName: relativeFile
      });
      return result?.code ? { code: result.code, map: result.map ?? null } : null;
    }
  };
}
var src_default = hallowSource;
export {
  src_default as default,
  hallowSource
};
