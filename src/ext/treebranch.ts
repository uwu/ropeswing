import { defineExt } from "@lib/utils";
import { contextify } from "@core/patcher";
import { extensions } from "@ext/all";

export default defineExt({
    patches: [
        {
            find: /run\(await .+?\((.)\)/,
            replace: (_, path) => `run(await $self.getFileContent(${path})`,
        },
    ],
    manifest: {
        name: "treebranch",
        description: "ropeswing in userland",
        authors: ["redstonekasi"],
    },
    async getFileContent(path: string) {
        let content = await w96.FS.readstr(path);

        for (const extension of extensions) {
            if (!extension.patches) continue;

            for (let patch of extension.patches) {
                if (patch.executable !== path) continue;
                content = content.replace(patch.find, contextify(patch.replace, extension.manifest.name) as string);
            }
        }

        return content;
    },
    core: true,
});
