export default {
    patches: [
        {
            find: /Windows 96 main<br>/,
            replace: (match) => `${match}ropeswing ${ROPESWING_COMMIT}<br>`,
        },
        {
            find: /Other trademarks and logos are property of their respective owners\./,
            replace: (match) => `${match}\n\nropeswing ${ROPESWING_COMMIT}, an <a href="https://github.com/uwu/ropeswing">uwunet project</a>.`,
            executable: "C:/system/local/bin/about-ui",
        }
    ],
    manifest: {
        name: "version",
        description: "show ropeswing version info on desktop",
        authors: ["redstonekasi"],
    },
    core: true,
} as Extension;
