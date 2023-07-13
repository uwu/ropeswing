export default {
    patches: [
        // These are both done with different replacement methods (string and function) to demo that functionality
        {
            find: "{caption:\"System Flags\",icon:await n.Q.getIconUrl(\"objects/tools\"),onclick:()=>s.xP.execCmd(\"flags\")}",
            replace: "$&,{caption:\"ropeswing\",icon:await n.Q.getIconUrl(\"apps/bug\"),onclick:()=>alert(\"TODO\")}",
        },
        {
            find: "{label:\"OS Flags\",onclick:()=>s.xP.execCmd(\"flags\")}",
            replace: (match) => `{label:\"ropeswing can also inject here!\",onclick:()=>alert(\"quite funky, eh?\")},${match}`,
        }
    ],
    manifest: {
        name: "royalmail",
        description: "settings frontend for ropeswing",
        authors: ["Beef"],
    },
} as Extension;