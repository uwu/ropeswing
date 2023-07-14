type ReplaceFn = (match: string, ...groups: string[]) => string;
type Replacer = string | ReplaceFn;

interface Patch {
    find: RegExp | string;
    // Sourced from lib.dom.ts
    replace: Replacer;
}

interface Extension {
    patches: Patch[];
    manifest: {
        name: string;
        description: string;
        authors: string[];
    }
    [index: string]: any;
}