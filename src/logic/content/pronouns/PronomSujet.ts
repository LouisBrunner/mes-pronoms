import { convertDB, type IPronounDB } from "@/logic/content/pronouns/types";

export const PronomSujetDB: IPronounDB = [
	{ id: 0, ipa: "jɛl", word: "iel" },
	{ id: 1, ipa: "jɛl", word: "yel" },
	{ id: 2, ipa: "il", word: "il" },
	{ id: 3, ipa: "ɛl", word: "elle" },
	{ id: 4, ipa: "il", word: "ille" },
	{ id: 5, ipa: "yl", word: "ul" },
	{ id: 6, ipa: "ol", word: "ol" },
	{ id: 7, ipa: "jol", word: "yol" },
	{ id: 8, ipa: "aɛl", word: "æl" },
	{ id: 9, ipa: "im", word: "im" },
	{ id: 10, ipa: "ɛm", word: "em" },
	{ id: 11, ipa: "ɛl", word: "el" },
	{ id: 12, ipa: "al", word: "al" },
	{ id: 13, ipa: "aɛl", word: "ælle" },
];

export const PronomSujetChoices = convertDB(PronomSujetDB);
