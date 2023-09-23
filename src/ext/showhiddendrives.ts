import { defineExt } from "@lib/utils";

export default defineExt({
	patches: [
		{
			find: /.\.features\.includes\(.\.f\.hidden\)/,
			replace: "false",
		},
	],
	manifest: {
		name: "showhiddendrives",
		description: "Shows all drives in explorer",
		authors: ["redstonekasi"],
	},
});
