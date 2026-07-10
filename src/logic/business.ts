import { GRAMMAR, type IPronounContent } from "@/logic/grammar/index.ts";
import { PRONOUNS, type PronounKind } from "@/logic/pronouns/index.ts";
import type { PronounPick } from "@/logic/storage/types.ts";

export interface ChosenPronoun {
	readonly ipa?: string | string[];
	readonly word: string | string[];
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

export const fetchGrammar = (pronoun: PronounKind): IPronounContent =>
	GRAMMAR[pronoun];

export const parseChoice = (
	pronoun: PronounKind,
	s: string,
): string | number => {
	const n = Number.parseInt(s, 10);
	if (Number.isNaN(n)) {
		return decodeURIComponent(s);
	}
	const choice = PRONOUNS[pronoun].lookup;
	if (choice[n] === undefined) {
		throw new Error(`invalid choice '${n}' for ${pronoun}`);
	}
	return n;
};

export const ensureChoice = (
	pronoun: PronounKind,
	s: string,
): string | number => {
	for (const entry of PRONOUNS[pronoun].db) {
		if (entry.word === s) {
			return entry.id;
		}
	}
	return s;
};
