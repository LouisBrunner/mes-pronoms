import { PronomSujetChoices } from "@/logic/content/pronouns/PronomSujet";
import type { IPronounsChoice } from "@/logic/content/pronouns/types";
import type { PronounKind } from "@/logic/types";

export interface IPronounTable {
	readonly pronouns: {
		[P in PronounKind]: IPronounsChoice;
	};
}

export const TABLE: IPronounTable = {
	pronouns: {
		PronomSujet: PronomSujetChoices,
	},
};
