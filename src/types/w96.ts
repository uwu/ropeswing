// adapted from https://git.sys36.net/windows-96/utilities/api-typings/-/blob/master/win96.d.ts

interface EmitterEvent {
	name: string;
	callback: Function;
	type: "recurring" | "single";
}

interface EventEmitter {
	eventQueue: EmitterEvent[];
	on(evtName: string, callback: Function): void;
	once(evtName: string, callback: Function): void;
	emit(evtName: string, ...args: any): void;
}

interface WindowParams {
	initialX?: number;
	initialY?: number;
	minHeight?: number;
	minWidth?: number;
	initialHeight?: number;
	initialWidth?: number;
	title?: string;
	resizable?: boolean;
	draggable?: boolean;
	taskbar?: boolean;
	icon?: string;
	center?: boolean;
	body?: string;
	bodyClass?: string;
	windowClass?: string;
	controlBoxStyle?: "WS_CBX_MINMAXCLOSE" | "WS_CBX_CLOSE" | "WS_CBX_MINCLOSE" | "WS_CBX_NONE";
	mobResize?: boolean;
	iframeFix?: boolean;
	animations?: {
		windowOpen: string;
		windowClose: string;
	};
	wndContainer?: HTMLDivElement;
}

declare class StandardWindow {
	readonly id: string;
	readonly useIcon: boolean;
	readonly wndObject: HTMLDivElement;
	readonly animations: {};
	readonly params: WindowParams;
	readonly isRegistered: boolean;
	readonly appbarRegistered: boolean;
	readonly shown: boolean;
	readonly _wmStylingAllowed: boolean;
	readonly maximized: boolean;
	readonly minimized: boolean;
	readonly uiUpdating: boolean;
	readonly windowIcon: string;
	readonly title: string;
	readonly maximizeInfo: {
		x: string;
		y: string;
		h: string;
		w: string;
	};

	onclose: (e: { canceled: boolean }) => void;
	onload: () => void;
	ondarkenelements: () => void;
	onlightenelements: () => void;
	_ext: {
		windowSnap: {
			snapped: boolean;
			originalSize: null;
		};
	};
	showTitlebarMenu(e: MouseEvent): void;
	registerWindow(): void;
	registerAppBar(): void;
	setTitle(text: string): void;
	setHtml(text: string): void;
	randomizePosition(): void;
	show(): void;
	center(current: boolean): void;
	activate(): void;
	toggleMinimize(): void;
	toggleMaximize(): void;
	close(ignoreEvents: boolean): void;
	darkenElements(): void;
	lightenElements(): void;
	setWindowIcon(icon_url: string): HTMLDivElement;
	setControlBoxStyle(cbstyle: "WS_CBX_CLOSE" | "WS_CBX_MINCLOSE" | "WS_CBX_MINMAXCLOSE" | "WS_CBX_NONE"): void;
	setSize(w: number, h: number, ignoreThemeOffsets?: boolean): void;
	setPosition(x: number, y: number): void;
	getBounds(): {
		x: number;
		y: number;
		height: number;
		width: number;
	};
	getComputedBounds(): DOMRect;
	getBodyContainer(): HTMLDivElement;
	constructor(params: WindowParams);
}

declare class WApplication {
	readonly appId: number;
	readonly appWindow: StandardWindow;
	readonly windows: StandardWindow[];
	onterminated: (result: any) => void;
	_running: boolean;
	_terminating: boolean;
	_appResult: any;
	setAppResult(v: any): void;
	terminate(): void;
	createWindow(params: WindowParams, isAppWindow: boolean): StandardWindow;
	main(argv: string[]): Promise<any>;
	ontermination(): void;
}

export interface W96API {
	FS: {
		readstr(path: string): Promise<string>;
	};
	evt: {
		fs: EventEmitter;
		sys: EventEmitter;
		wm: EventEmitter;
		ui: EventEmitter;
	};
	WApplication: {
		new (): WApplication;
		prototype: WApplication;

		kill(app_id: number, force: boolean): void;
		execAsync(instance: WApplication, args: string[]): Promise<any>;
	};
}
