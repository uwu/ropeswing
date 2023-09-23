declare module "*.css" {
	const classes: Record<string, string>;
	export default classes;
	export const css: string;
}

declare module "*.scss" {
	const classes: Record<string, string>;
	export default classes;
	export const css: string;
}

declare module "*.sass" {
	const classes: Record<string, string>;
	export default classes;
	export const css: string;
}

declare module "@ext/all" {
	import { Extension } from "@/lib/define";

	export const extensions: Extension[];
}
