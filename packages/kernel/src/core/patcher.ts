import { builtInExtensions } from "@/ext";

// TODO: User extensions
const extensions = [...builtInExtensions];

export function applyPatches(mainScript: HTMLScriptElement) {
    if (!mainScript.textContent) throw new Error("Script doesn't have textContent, what?");

    console.group("[ ropeswing-patcher ]");

    for (let extension of extensions) {
        for (let patch of extension.patches) {
            // TODO: Using `as string` is bad, but TypeScript wasn't having it with my replace typings, and this works
            mainScript.textContent = mainScript.textContent.replace(patch.find, patch.replace as string);
            console.log(`applied patch ${extension.patches.indexOf(patch) + 1} of ${extension.patches.length} from ${extension.manifest.name}`);
        }
    }

    console.groupEnd();
}