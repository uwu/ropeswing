export default {
    patches: [
        {
            find: /.\.features\.includes\(.\.f\.hidden\)/,
            replace: "false",
        },
    ],
    manifest: {
        name: "showhiddendrives",
        description: "Shows all drives in explorer",
        authors: ["redstonekasi"],
    },
} as Extension;
