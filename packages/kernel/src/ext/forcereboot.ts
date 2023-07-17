export default {
    patches: [
        {
            executable: "C:/system/local/bin/shell36",
            find: /document\.addEventListener\("keydown",/,
            replace: () => "(",
        },
    ],
    manifest: {
        name: "forcereboot",
        description: "Removes the reboot confirmation when pressing Ctrl+R or F5",
        authors: ["redstonekasi"],
    },
} as Extension;
