/** biome-ignore-all lint/style/useNamingConvention: wrong */
import { parseForm, type WordForm } from "@/logic/pronouns/_helpers.ts";
import { PRONOUNS, type PronounKind } from "@/logic/pronouns/index.ts";
import type { PronounSelections } from "@/logic/storage/store.ts";

const resolveWord = (
	kind: PronounKind,
	selections: PronounSelections,
): WordForm => {
	const pick = selections[kind];
	if (typeof pick === "string") {
		return pick;
	}
	return PRONOUNS[kind].lookup[pick ?? 0]?.word ?? "";
};

export const resolvePronouns = (
	kind: PronounKind,
	selections: PronounSelections,
): [string, string] => getForms(kind, resolveWord(kind, selections));

const VOWEL_SOUND = /^[aeiouàâäéèêëïîôöùûüh]/i;
export const mustEllide = (word: string): boolean => VOWEL_SOUND.test(word);

const IRREGULAR_PLURALS: Record<string, string> = {
	Madame: "Mesdames",
	Monsieur: "Messieurs",
	neveu: "neveux",
	tout: "tous",
	tout·e: "tou·te·s",
};

const suffixS = /s$/;
const suffixPM = /·[^·\s]+$/;
const suffixEAU = /eau$/;

const pluralizeWord = (kind: PronounKind, word: string): string => {
	switch (kind) {
		case "FamilleModificateur":
			if (word === "grand") {
				return "grand";
			}
			break;
		case "ArticleDefini":
			return "les";
		case "ArticleIndefini":
		case "ArticlePartitif":
			return "des";
		case "DeterminantPossessifJe":
			return "mes";
		case "DeterminantPossessifTu":
			return "tes";
		case "DeterminantPossessif":
			return "ses";
		case "DeterminantDemonstratif":
			return "ces";
	}
	const irregular = IRREGULAR_PLURALS[word];
	if (irregular !== undefined) {
		return irregular;
	}
	if (suffixEAU.test(word)) {
		return `${word}x`;
	}
	if (suffixPM.test(word)) {
		return `${word}·s`;
	}
	if (suffixS.test(word)) {
		return word;
	}
	return `${word}s`;
};

export const pluralize = (kind: PronounKind, word: string): string =>
	word
		.split("/")
		.map((w) => pluralizeWord(kind, w))
		.join("/");

export const getForms = (
	kind: PronounKind,
	word: WordForm,
): [string, string] => {
	const form = parseForm(word);
	if (form.type === "dual") {
		return [form.singular, form.plural];
	}
	return [form.singular, pluralize(kind, form.singular)];
};
