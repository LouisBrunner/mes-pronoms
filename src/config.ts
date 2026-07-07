export const isDev = import.meta.env.DEV;
export const baseURL = import.meta.env.PROD
	? "https://mes-pronoms.lbrunner.net"
	: "http://localhost:5173";
