export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const defineExt = <T extends Extension>(e: T) => e;
