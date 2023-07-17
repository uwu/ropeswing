import { extensions } from "@ext/all";

export function contextify(replace: Replacer, extName: string): Replacer {
    const self = `ropeswing.extensions["${extName}"]`;
    switch (typeof replace) {
        case "string": return replace.replaceAll("$self", self);
        case "function": return (...args) => replace(...args).replaceAll("$self", self);
    }
}

export function applyPatches(mainScript: HTMLScriptElement) {
    if (!mainScript.textContent) throw new Error("Script doesn't have textContent, what?");

    console.group("[ ropeswing-patcher ]");

    for (let extension of extensions) {
        for (let patch of extension.patches) {
            if (patch.executable) continue;
            // TODO: Using `as string` is bad, but TypeScript wasn't having it with my replace typings, and this works
            mainScript.textContent = mainScript.textContent.replace(patch.find, contextify(patch.replace, extension.manifest.name) as string);
            console.log(`applied patch ${extension.patches.indexOf(patch) + 1} of ${extension.patches.length} from ${extension.manifest.name}`);
        }
    }

    console.groupEnd();
}
