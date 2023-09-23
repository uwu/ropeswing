import api from "@core/api";
import { W96API } from "./w96";
import { KUtil } from "./kutil";

declare global {
	const ROPESWING_COMMIT: string;

	var w96: W96API;
	var kutil: KUtil;

	interface Window {
		ropeswing: ReturnType<typeof api>;
		__string_require__: (exp: string | RegExp) => void;
	}
}
