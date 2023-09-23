import api from "@core/api";

declare global {
    const ROPESWING_COMMIT: string;
    const w96: W96API;
    const kutil: KUtil;

    interface Window {
        ropeswing: ReturnType<typeof api>;
        __string_require__: (exp: string | RegExp) => void;
        w96: W96API;
        kutil: KUtil;
    }
}
