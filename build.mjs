import { execSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { build, context } from "esbuild";
import alias from "esbuild-plugin-alias";
import { postcssModules, sassPlugin } from "esbuild-sass-plugin";
import chokidar from "chokidar";
import { listen } from "listhen";
import * as colors from "colorette";

const dev = process.argv.includes("--dev");
const tsconfig = JSON.parse(await readFile("./tsconfig.json"));
const aliases = Object.fromEntries(Object.entries(tsconfig.compilerOptions.paths).map(([alias, [target]]) => [alias, resolve(target)]));
const hash = execSync("git rev-parse --short HEAD").toString().trim() + (dev ? "-dev" : "");

/** @type import("esbuild").BuildOptions */
const options = {
    entryPoints: ["./src/index.ts"],
    outfile: "./dist/ropeswing.js",
    minify: !dev,
    bundle: true,
    format: "iife",
    target: "esnext",
    plugins: [
        alias(aliases),
        sassPlugin({
            type: "style",
            transform: postcssModules({
                localsConvention: "camelCaseOnly",
            }),
        }),
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
};

if (!dev) {
    console.log(`Building commit ${hash}...`);
    try {
        await build(options);
        console.log("Build finished");
    } catch (e) {
        console.error("Build failed");
    }
} else {
    console.log("Watching for changes");
    const ctx = await context(options);

    const watcher = chokidar.watch(".", {
        ignored: ["**/{.git,node_modules}/**", "dist"],
        ignoreInitial: true,
        ignorePermissionErrors: true,
    });

    const debouncedBuild = debouncePromise(
        () => ctx.rebuild(),
        100,
        () => {}
    );

    watcher.on("all", (ev, path) => {
        console.log("Changed", path);
        debouncedBuild();
    });

    const listener = await listen((req, res) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
        });
        const stream = createReadStream("./dist/ropeswing.js");
        stream.pipe(res);
    }, {
        showURL: false,
    });
    const bundle = listener.url + "ropeswing.js";
    console.log(` > ${colors.cyan("https://w96.kasi.workers.dev/install?bundle=" + encodeURIComponent(bundle))}\n`);

    debouncedBuild();
}

function debouncePromise(fn, delay, onError) {
    let timeout;
    let promiseInFly;
    let callbackPending;

    return function debounced(...args) {
        if (promiseInFly) {
            callbackPending = () => {
                debounced(...args);
                callbackPending = undefined;
            };
        } else {
            if (timeout != null) clearTimeout(timeout);

            timeout = setTimeout(() => {
                timeout = undefined;
                promiseInFly = fn(...args)
                    .catch(onError)
                    .finally(() => {
                        promiseInFly = undefined;
                        if (callbackPending) callbackPending();
                    });
            }, delay);
        }
    };
}
