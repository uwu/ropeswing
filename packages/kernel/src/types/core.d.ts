type ReplaceFn = (match: string, ...groups: string[]) => string;

interface Patch {
    find: RegExp | string;
    // Sourced from lib.dom.ts
    replace: string | ReplaceFn;
}

interface Extension {
    patches: Patch[];
    manifest: {
        name: string;
        description: string;
        authors: string[];
    }
}