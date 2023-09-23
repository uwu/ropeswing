import { defineExtension } from "@/lib/define";

export default defineExtension({
	patches: [
		{
			executable: "C:/system/local/bin/resetwiz",
			find: /localStorage\.clear\(\)/g,
			replace: (match) => `$self.save(),${match},$self.restore()`,
		},
		{
			executable: "C:/system/local/bin/resetwiz",
			find: /;(.{1,2}?)\.querySelector\("\.w96-radiobox"\)\.replaceWith\(.{1,2}?\.getElement\(\)\)/,
			replace: (match, page) => `;${match};$self.appendToggle(${page})`
		},
	],
	manifest: {
		name: "persist",
		description: "persist ropeswing installation across wizard resets",
		authors: ["redstonekasi"],
	},
	persist: true,
	kinject: "",
	save() {
		if (!this.persist) return;
		this.kinject = kutil.sysrom.read("KINJECT.js");
	},
	restore() {
		if (!this.persist) return;
		kutil.sysrom.write("KINJECT.js", this.kinject);
	},
	appendToggle(page: Element) {
		const box = page.querySelector(".w96-radiobox")?.parentElement;
		if (!box) return;

		// TODO: Type this
		const checkbox = new (w96 as any).ui.components.CheckBox({
			label: "Persist ropeswing installation",
			checked: this.persist,
			onchange: (e: any) => (this.persist = e.checked),
		});

		box.appendChild(checkbox.getElement());
	},
	core: true,
});
