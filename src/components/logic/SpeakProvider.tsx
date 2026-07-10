import type { ReactNode } from "react";
import { SpeakContext, useSynthesis } from "@/hooks/useSpeak.ts";

export type SpeakProviderProps = {
	children: ReactNode;
};

export const SpeakProvider = ({ children }: SpeakProviderProps) => {
	const speak = useSynthesis();

	return (
		<SpeakContext.Provider value={speak}>{children}</SpeakContext.Provider>
	);
};
