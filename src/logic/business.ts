import {
	getPronounSingular,
	type WordForm,
} from "@/logic/pronouns/_helpers.ts";
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

const SHORT_FORM_PRONOUNS: PronounKind[] = [
	"PronomSujet",
	"PronomObjet",
	"DeterminantPossessif",
	"PronomPossessif",
];

export const computeShortForm = (
	pronouns: Partial<Record<PronounKind, PronounPick>>,
): string | undefined => {
	const words = SHORT_FORM_PRONOUNS.map((pronoun) => {
		const chosen = choosePronoun(pronoun, pronouns[pronoun])?.word;
		return chosen ? getPronounSingular(chosen) : undefined;
	})
		.filter((word): word is string => word !== undefined)
		.filter((word, i, all) => i === 0 || word !== all[i - 1]);
	if (words.length === 0) {
		return;
	}
	return words.join("/");
};
