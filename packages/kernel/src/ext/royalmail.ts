export default {
    patches: [
        {
            find: /{caption:"System Flags",icon:await (?<getIconUrl>.{1,2}\..{1,2}\.getIconUrl)\("objects\/tools"\),onclick:\(\)=>s.xP.execCmd\("flags"\)}/,
            replace: "$&,{category:\"ropeswing\"},{caption:\"Settings\",icon:await $<getIconUrl>(\"apps/settings\"),onclick:()=>alert(\"TODO\")}",
        },
    ],
    manifest: {
        name: "royalmail",
        description: "settings frontend for ropeswing",
        authors: ["Beef"],
    },
} as Extension;