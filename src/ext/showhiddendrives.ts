import { defineExtension } from "@/lib/define";

export default defineExtension({
	patches: [
		{
			find: /.\.features\.includes\(.\.f\.hidden\)/,
			replace: "false",
		},
	],
	manifest: {
		name: "showhiddendrives",
		description: "shows all drives in explorer",
		authors: ["redstonekasi"],
	},
});
