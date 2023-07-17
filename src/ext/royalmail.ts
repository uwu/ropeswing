export default {
    patches: [
        {
            find: /{caption:"System Flags",icon:await (.{1,2}\..{1,2}\.getIconUrl)\("objects\/tools"\),onclick:\(\)=>(.{1,2}\..{1,2}\.execCmd)\("flags"\)}/,
            replace: (match, getIconUrl, execCmd) => `${match},{category:"ropeswing"},{caption:"Settings",icon:await ${getIconUrl}("apps/settings"),onclick:()=>${execCmd}("ctrl", ["--cpl", "ropeswing"])}`,
        },
        {
            find: "rcon:k",
            replace: (match) => `${match},ropeswing:$self.applet(__string_require__("Application not found").QP)`,
        },
    ],
    manifest: {
        name: "royalmail",
        description: "settings frontend for ropeswing",
        authors: ["Beef"],
    },
    applet: (AppletBase: any) =>
        class RoyalmailApplet extends AppletBase {
            constructor() {
                super();
            }

            async main(e: any) {
                if (super.main(e)) return;
                const window = this.createWindow(
                    {
                        taskbar: false,
                        center: true,
                        bodyClass: "ropeswing-applet",
                        initialWidth: 320,
                        initialHeight: 340,
                        resizable: false,
                        controlBoxStyle: "WS_CBX_CLOSE",
                        title: "ropeswing",
                        body: '<div style="color: red">TODO!</div>',
                    },
                    true
                );

                window.show();
            }
        },
} as Extension;
