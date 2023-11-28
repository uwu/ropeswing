import { contextify } from "@/core/patcher";
import { defineExtension } from "@/lib/define";
import { extensions } from "@ext/all";

// This worker provides a version of MsgRoom that doesn't run the main script while also setting CORS headers.
const custom = "https://w96-msgroom.kasi.workers.dev";

export default defineExtension({
	patches: [
		{
			executable: "C:/system/local/bin/win96-chat",
			find: /https\:\/\/devel.windows96.net\:4096\//g,
			replace: () => custom,
		},
		{
			executable: "C:/system/local/bin/win96-chat",
			find: /,(.{1,2})\.onload=\(\)=>\{/,
			replace: (_, frame) => `,${frame}.onload=async()=>{await $self.onFrameLoad(${frame}),`,
		},
	],
	manifest: {
		name: "msgbranch",
		description: "ropeswing in msgroom",
		authors: ["redstonekasi"],
	},
	async onFrameLoad(frame: HTMLIFrameElement) {
		const evil = (script: string) => frame.contentWindow!.postMessage({ op: "eval", script }, custom);
		
		let main = await fetch(`${custom}/main.js`).then((r) => r.text());

		for (const extension of extensions) {
			if (!extension.patches) continue;

			for (let patch of extension.patches) {
				if (patch.executable !== "$msgroom") continue;
				main = main.replace(patch.find, contextify(patch.replace, extension.manifest.name) as string);
			}
		}

		evil(main);
		evil("app.call(window);");
	},
	core: true,
});
