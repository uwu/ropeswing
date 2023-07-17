import unbox from "@ext/unbox";
import royalmail from "@ext/royalmail";
import keygen from "@ext/keygen";
import treebranch from "./treebranch";
import version from "./version";
import forcereboot from "./forcereboot";

// TODO: User extensions
export const builtInExtensions = [
    unbox,
    treebranch,
    royalmail,
    keygen,
    version,
    forcereboot,
];

export const extensions = [...builtInExtensions];
