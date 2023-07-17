import { extensions } from "@ext/all";
import * as utils from "@lib/utils";
import * as console from "@lib/console";

export default () => ({
    console,
    utils,
    extensions: Object.fromEntries([...extensions].map((e) => [e.manifest.name, { ...e }])),
});
