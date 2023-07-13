import { instead } from "spitroast";
import { writeLine } from "@lib/console";

// W96 like to do this, let's follow the convention
console.group("[ ropeswing ]");
console.log("in kernel ctx...");

const unpatch = instead("appendChild", document.head, (args, orig) => {
    unpatch();
    if (!(args[0] instanceof HTMLScriptElement)) orig(...args);
    const main: HTMLScriptElement = args[0];

    writeLine("[ropeswing] preboot loaded. welcome!");
    writeLine("applying patches...");

    // TODO: This is temporary, but a POC!
    const customSettingsEntry = "{caption:\"ropeswing\",icon:await n.Q.getIconUrl(\"apps/bug\"),onclick:()=>alert(\"TODO\")}";
    const entrypoint = "{caption:\"System Flags\",icon:await n.Q.getIconUrl(\"objects/tools\"),onclick:()=>s.xP.execCmd(\"flags\")}";
    main.textContent = main.textContent!.replaceAll(
        entrypoint,
        `${entrypoint},${customSettingsEntry}`,
    )

    const entry2 = "{label:\"OS Flags\",onclick:()=>s.xP.execCmd(\"flags\")}";
    const custom2 = "{label:\"we can also inject here!\",onclick:()=>alert(\"quite funky, eh?\")}";
    main.textContent = main.textContent!.replaceAll(
        entry2,
        `${custom2},${entry2}`,
    )
    
    writeLine("booting original!");
    orig(...args)
});

console.groupEnd();
