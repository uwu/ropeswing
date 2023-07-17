import { instead } from "spitroast";
import { writeLine } from "@lib/console";
import { applyPatches } from "@core/patcher";
import api from "@core/api";

// W96 like to do this, let's follow the convention
console.group("[ ropeswing ]");
console.log("in kernel ctx...");

const unpatch = instead("appendChild", document.head, (args, orig) => {
    unpatch();
    if (!(args[0] instanceof HTMLScriptElement)) orig(...args);
    const main: HTMLScriptElement = args[0];

    writeLine("[ropeswing] preboot loaded. welcome!");

    writeLine("exposing API...");
    window.ropeswing = api();

    writeLine("applying patches...");
    applyPatches(main);

    writeLine("booting original!");
    orig(...args);

    if (localStorage["ropeswing-welcome"] !== "true") {
        localStorage["ropeswing-welcome"] = "true";
        w96.evt.sys.on("init-complete", () =>
            w96.WApplication.execAsync(
                new (class extends w96.WApplication {
                    main(argv) {
                        super.main(argv);
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
                        body.querySelector("button").addEventListener("click", () => {
                            popup.close();
                        });
                        popup.setPosition(window.innerWidth / 2 - 130, window.innerHeight / 2 - 60);
                        popup.show();
                    }
                })(),
                null,
                null
            )
        );
    }
});

console.log("kernel done!");
console.groupEnd();
