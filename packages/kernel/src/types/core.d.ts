type ReplaceFn = (match: string, ...groups: string[]) => string;
type Replacer = string | ReplaceFn;

interface Patch {
    find: RegExp | string;
    // Sourced from lib.dom.ts
    replace: Replacer;
    /** Absolute path to the executable this patch should target, if set, makes this patch a userland patch. */
    executable?: string;
}

interface Extension {
    patches: Patch[];
    manifest: {
        name: string;
        description: string;
        authors: string[];
    };
    [index: string]: any;
}
