import api from "@core/api";

declare global {
    interface Window {
        ropeswing: ReturnType<typeof api>;
        __string_require__: (exp: string | RegExp) => void;
    }
}