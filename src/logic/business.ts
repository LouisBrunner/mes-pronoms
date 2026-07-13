import type { WordForm } from "@/logic/pronouns/_helpers.ts";
import { PRONOUNS, type PronounKind } from "@/logic/pronouns/index.ts";
import type { PronounPick } from "@/logic/storage/types.ts";

export interface ChosenPronoun {
	readonly ipa?: WordForm;
	readonly word: WordForm;
}

export const choosePronoun = (
	pronoun: PronounKind,
	picked: PronounPick | undefined,
): ChosenPronoun | undefined => {
	if (picked === undefined) {
		return;
	}
	if (typeof picked === "string") {
		return { word: picked };
	}
	return PRONOUNS[pronoun].lookup[picked];
};
