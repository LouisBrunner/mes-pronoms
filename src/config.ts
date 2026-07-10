export const isDev = import.meta.env.DEV;
export const baseURL = import.meta.env.PROD
	? "https://mes-pronoms.lbrunner.net"
	: "http://localhost:5173";

// biome-ignore lint/suspicious/noExplicitAny: no other way
export const debugLog = (...args: any[]) => {
	if (isDev) {
		// biome-ignore lint/suspicious/noConsole: allowed in debug
		console.log(...args);
	}
};
