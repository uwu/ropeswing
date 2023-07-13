import { timer } from "@lib/utils";

const con = document.getElementById("convga");
if (!con) throw new Error("Failed to find VGA console element - are we on the right site?");

export const clear = () => con.innerHTML = "";
export const write = (...content: string[]) => con.textContent += content.join(" ");
export const writeLine = (...content: string[]) => write(content.join(" ") + "\n");
export const typewrite = async (delay: number, ...content: string[]) => { for (let i of content.join(" ").split("")) { write(i); await timer(delay) } };