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
