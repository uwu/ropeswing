import { contextify } from "@/core/patcher";
import { extensions } from "@ext/all";

export default {
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

        for (const ext of extensions) {
            for (let patch of ext.patches) {
                if (patch.executable !== path) continue;
                content = content.replace(patch.find, contextify(patch.replace, ext.manifest.name) as string);
            }
        }

        return content;
    },
    core: true,
} as Extension;
