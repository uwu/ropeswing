import unbox from "@ext/unbox";
import royalmail from "@ext/royalmail";

// TODO: User extensions
export const builtInExtensions = [
    unbox,
    royalmail,
];

export const extensions = [...builtInExtensions];