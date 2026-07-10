import type { PronounKind } from "@/logic/pronouns/index.ts";

export type PronounPick = number | string;

export type PronounsStorage = {
	pronouns: {
		[P in PronounKind]?: PronounPick;
	};
};

export const emptyStorage = (): PronounsStorage => ({ pronouns: {} });

export type ExportOptions = {
	compress: boolean;
};
