export default {
    patches: [
        {
            find: /Windows 96 main<br>/,
            replace: (match) => `${match}ropeswing ${ROPESWING_COMMIT}<br>`,
        },
    ],
    manifest: {
        name: "version",
        description: "show ropeswing version info on desktop",
        authors: ["redstonekasi"],
    },
    core: true,
} as Extension;
