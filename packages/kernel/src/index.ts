import { typewrite } from "@lib/console";
import constants from "@lib/constants";

(async () => {
    // W96 like to do this, let's follow the convention
    console.group("[ ropeswing ]");
    console.log("in kernel ctx...");

    console.log("declaring w96 entrypoint");
    let fullW96Obj: Record<string, any> = new Proxy({}, {
        get: (target, prop) => {
            if (prop !== "main") return Reflect.get(target, prop);
            return () => {
                console.log("[ ropeswing-preboot ] we're in!");
                console.log("original boot func stored on window :)");
                typewrite(25, constants.greet);
            }
        }
    });

    Object.defineProperty(window, "w96", {
        get: () => fullW96Obj,
        set: (obj) => {
            Object.keys(obj).forEach(k => {
                fullW96Obj[k] = obj[k];
            });
        },
        configurable: false,
    });

    console.groupEnd();
})();