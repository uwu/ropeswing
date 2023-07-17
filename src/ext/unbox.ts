export default {
    patches: [
        {
            find: /var __webpack_exports__=__webpack_require__\(\d{4}\)/,
            replace: (match) => `${match};$self.unpack(__webpack_require__,__webpack_modules__);`,
        },
    ],
    manifest: {
        name: "unbox",
        description: "webpack unpacker",
        authors: ["Beef"],
    },
    unpack(wpRequire: Function, modules: Record<number, Function>) {
        // TODO: This is temporary and hacky, a proper webpack dependency system is needed!
        window.__string_require__ = (exp: string | RegExp) => {
            for (let [id, mod] of Object.entries(modules)) {
                const stringified = mod.toString();
                if ((exp instanceof RegExp && exp.test(stringified)) || (typeof exp === "string" && stringified.includes(exp))) return wpRequire(id);
            }
        };
    },
} as Extension;
