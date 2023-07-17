import unbox from "@ext/unbox";
import royalmail from "@ext/royalmail";
import keygen from "@ext/keygen";
import treebranch from "./treebranch";
import version from "./version";

// TODO: User extensions
export const builtInExtensions = [
    unbox,
    treebranch,
    royalmail,
    keygen,
    version,
];

export const extensions = [...builtInExtensions];
