import unbox from "@ext/unbox";
import royalmail from "@ext/royalmail";
import keygen from "@ext/keygen";
import treebranch from "./treebranch";

// TODO: User extensions
export const builtInExtensions = [
    unbox,
    treebranch,
    royalmail,
    keygen,
];

export const extensions = [...builtInExtensions];
