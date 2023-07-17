import { useRoot, render, createElement } from "voby";
import { before } from "spitroast";
import Settings from "@ext/royalmail/pages/Settings";
import Extensions from "@ext/royalmail/pages/Extensions";

const pages = [
    { name: "Settings", component: Settings, isDefault: true },
    { name: "Extensions", component: Extensions },
];

export default {
    patches: [
        {
            find: /{caption:"System Flags",icon:await (.{1,2}\..{1,2}\.getIconUrl)\("objects\/tools"\),onclick:\(\)=>(.{1,2}\..{1,2}\.execCmd)\("flags"\)}/,
            replace: (match, getIconUrl, execCmd) => `${match},{caption:"ropeswing",icon:await ${getIconUrl}("apps/settings"),onclick:()=>${execCmd}("ctrl", ["--cpl", "royalmail"])}`,
        },
        {
            find: "rcon:k",
            replace: (match) => `${match},royalmail:$self.app(w96.WApplication, w96.ui.components)`,
        },
    ],
    manifest: {
        name: "royalmail",
        description: "settings frontend for ropeswing",
        authors: ["Beef"],
    },
    core: true,
    app: (WApplication: any, components: Record<string, any>) => class RoyalmailApplet extends WApplication {
        constructor() {
            super();
        }
    
        // TODO: Check that this whole thing disposes properly.
        // By all right, it should, however I am unsure if the weird stuff I do with the pages will mess anything up.
        public main = (argv: string[]) => useRoot((dispose) => {
            // HACK: Persist the original onterminated behaviour because we are an applet, but also dispose our reactive root
            before("onterminated", this, dispose, true);
            if ((super.main(argv), document.querySelector(".royalmail-applet"))) return;
    
            const mainWnd = this.createWindow({
                center: true,
                taskbar: false,
                resizable: false,
                initialWidth: 370,
                initialHeight: 450,
                controlBoxStyle: "WS_CBX_CLOSE",
                bodyClass: "royalmail-applet",
                title: "ropeswing",
            }, true);
    
            const tabControl = new components.TabControl();
            pages.forEach((p) => {
                const page = tabControl.addPage(p.name, async (elem: HTMLElement) => { render(createElement(p.component), elem) });
                if (p.isDefault) tabControl.openPage(page);
            });

            const tabElem = tabControl.getElement();
            tabElem.style.height = "100%"; 

            mainWnd.getBodyContainer().appendChild(tabElem);
            mainWnd.show();
        });
    },
} as Extension;
