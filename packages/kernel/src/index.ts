import { instead } from "spitroast";
import { writeLine } from "@lib/console";
import { applyPatches } from "./core/patcher";

// W96 like to do this, let's follow the convention
console.group("[ ropeswing ]");
console.log("in kernel ctx...");

const unpatch = instead("appendChild", document.head, (args, orig) => {
    unpatch();
    if (!(args[0] instanceof HTMLScriptElement)) orig(...args);
    const main: HTMLScriptElement = args[0];

    writeLine("[ropeswing] preboot loaded. welcome!");
    writeLine("applying patches...");
    applyPatches(main);

    writeLine("booting original!");
    orig(...args);
});

console.log("kernel done!");
console.groupEnd();
