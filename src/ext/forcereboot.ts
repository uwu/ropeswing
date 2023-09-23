import { defineExtension } from "@/lib/define";

export default defineExtension({
	patches: [
		{
			executable: "C:/system/local/bin/shell36",
			find: /document\.addEventListener\("keydown",/,
			replace: () => "(",
		},
	],
	manifest: {
		name: "forcereboot",
		description: "removes the reboot confirmation when pressing Ctrl+R or F5",
		authors: ["redstonekasi"],
	},
});
