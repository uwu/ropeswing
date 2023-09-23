import { defineExtension } from "@/lib/define";

export default defineExtension({
	patches: [
		{
			find: /Windows 96 main<br>/,
			replace: (match) => `${match}ropeswing ${ROPESWING_COMMIT}<br>`,
		},
		{
			find: /Other trademarks and logos are property of their respective owners\./,
			replace: (match) => `${match}\n\nropeswing ${ROPESWING_COMMIT}, an <a href="https://github.com/uwu/ropeswing">uwunet project</a>.`,
			executable: "C:/system/local/bin/about-ui",
		},
	],
	onLoad() {
		if (localStorage["ropeswing-welcome"] !== "true") {
			localStorage["ropeswing-welcome"] = "true";
			w96.WApplication.execAsync(this.dialog(w96.WApplication), []);
		}
	},
	manifest: {
		name: "housekeeper",
		description: "basic ropeswing info, e.g. welcome dialog, version listing",
		authors: ["redstonekasi", "Beef"],
	},
	core: true,
	dialog: (WApplication: typeof w96.WApplication) =>
		new (class WelcomeDialog extends WApplication {
			async main(argv: string[]) {
				super.main(argv);
				// @ts-expect-error
				const popup = this.createWindow({
					title: "ropeswing",
					initialHeight: 120,
					initialWidth: 260,
					resizable: false,
					bodyClass: "dlg-run-box",
					controlBoxStyle: "WS_CBX_CLOSE",
				});
				const body = popup.getBodyContainer();
				body.innerHTML = `<div class="text exp">ropeswing has been installed!<br>Check your system settings in order to configure it.</div><button class="w96-button">OK</button>`;
				body.querySelector("button")?.addEventListener("click", () => popup.close(false));

				popup.setPosition(window.innerWidth / 2 - 130, window.innerHeight / 2 - 60);
				popup.show();
			}
		})(),
});
