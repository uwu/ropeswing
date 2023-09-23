type ReplaceFn = (match: string, ...groups: string[]) => string;
export type Replacer = string | ReplaceFn;

export interface Patch {
	find: RegExp | string;
	// Sourced from lib.dom.ts
	replace: Replacer;
	/** Absolute path to the executable this patch should target, if set, makes this patch a userland patch. */
	executable?: string;
}

export interface Extension {
	patches?: Patch[];
	/** Runs *after* w96 has initialised */
	onLoad?: () => void;
	/** Currently unused. */
	onUnload?: () => void;
	manifest: {
		name: string;
		description: string;
		authors: string[];
	};
	core?: boolean;
}

export const defineExtension = <T extends Extension>(e: T) => e;
