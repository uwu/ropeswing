import { execSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "esbuild";
import alias from "esbuild-plugin-alias";

const tsconfig = JSON.parse(await readFile("./tsconfig.json"));
const aliases = Object.fromEntries(Object.entries(tsconfig.compilerOptions.paths).map(([alias, [target]]) => [alias, resolve(target)]));
const hash = execSync("git rev-parse --short HEAD").toString().trim();
console.log(`Building commit ${hash}...`);

try {
    await build({
        entryPoints: ["./src/index.ts"],
        outfile: "./dist/ropeswing.js",
        minify: true,
        bundle: true,
        format: "iife",
        target: "esnext",
        plugins: [
            alias(aliases),
            {
                name: "extensions",
                setup: (build) => {
                    const filter = /@ext\/all/;
                    build.onResolve({ filter }, ({ path }) => ({ path, namespace: "extensions" }));
                    build.onLoad({ filter, namespace: "extensions" }, async () => {
                        const exts = await readdir("./src/ext");

                        let i = 0;
                        const exp = [];
                        const imports = exts.map((e) => (exp.push(`e${i}`), `import e${i++} from "./${e.replace(".ts", ".js")}";`)).join("\n");

                        return {
                            contents: `${imports}export const extensions = [${exp.join(", ")}];`,
                            resolveDir: "./src/ext",
                        };
                    });
                },
            },
        ],
        define: {
            ROPESWING_COMMIT: `"${hash}"`,
        },
        footer: { js: "//# sourceURL=ropeswing" },
        legalComments: "none",
    });

    console.log("Build successful!");
} catch (e) {
    console.error("Build failed...", e);
    process.exit(1);
}
