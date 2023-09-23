interface SysromEntry {
	/** Size */
	l: number;
	/** Name */
	n: string;
}

interface Sysrom {
	ls: () => SysromEntry[];
	exists: (file: string) => boolean;
	write: <T>(file: string, content: T) => void;
	read: <T>(file: string) => T;
	rm: (file: string) => void;
}

export interface KUtil {
	sysrom: Sysrom;
}
