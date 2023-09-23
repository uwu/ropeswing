import { defineExtension } from "@/lib/define";

// TODO: Add a checkbox in the reset wizard
export default defineExtension({
	patches: [
		{
			executable: "C:/system/local/bin/resetwiz",
			find: /localStorage\.clear\(\)/g,
			replace: (o) => `$self.save(),${o},$self.restore()`,
		},
	],
	manifest: {
		name: "persist",
		description: "persist ropeswing installation across reset",
		authors: ["redstonekasi"],
	},
	kinject: "",
	save() {
		this.kinject = kutil.sysrom.read("KINJECT.js");
	},
	restore() {
		kutil.sysrom.write("KINJECT.js", this.kinject);
	},
	core: true,
});
