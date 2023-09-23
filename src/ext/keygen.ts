import { defineExt } from "@lib/utils"

export default defineExt({
    patches: [
        {
            find: /\(await\(0,.{1,2}\..{1,2}\)\(i\.value\)\)\.valid/,
            replace: "true",
        },
        {
            find: "the product key you have received on Patreon",
            replace: (match) => `<s>${match}</s> any product key`,
        },
    ],
    manifest: {
        name: "keygen",
        description: "makes the keymgr app (patreon rewards app) accept any key",
        authors: ["Beef"],
    },
});
