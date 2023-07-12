import { timer } from "@lib/utils";

const con = document.getElementById("convga");
if (!con) throw new Error("Failed to find VGA console element - are we on the right site?");

export const clear = () => con.textContent = "";
export const write = (...content: string[]) => con.textContent += content.join(" ");
export const writeLine = (...content: string[]) => write(content.join(" ") + "\n");
export const typewrite = (delay: number, ...content: string[]) => content.join(" ").split("").forEach(async i => { write(i); await timer(delay) });