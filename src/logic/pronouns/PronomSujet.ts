import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const PronomSujetDB: IPronounDB = [
	{ id: 0, ipa: "jɛl", word: "iel" },
	{ id: 1, ipa: "jɛl", word: "yel" },
	{ id: 2, ipa: "il", word: "il" },
	{ id: 4, ipa: "il / ij", word: "ille" },
	{ id: 3, ipa: "ɛl", word: "elle" },
	{ id: 23, ipa: "ɛli", word: "elli" },
	{ id: 5, ipa: "yl", word: "ul" },
	{ id: 17, ipa: "yl", word: "ulle" },
	{ id: 6, ipa: "ɔl", word: "ol" },
	{ id: 16, ipa: "ɔl", word: "olle" },
	{ id: 7, ipa: "jɔl", word: "yol" },
	{ id: 8, ipa: "a.ɛl", word: "æl" },
	{ id: 15, ipa: "a.ɛl", word: "aël" },
	{ id: 13, ipa: "a.ɛl", word: "ælle" },
	{ id: 14, ipa: "il.ɛl", word: "ilelle" },
	{ id: 9, ipa: "im", word: "im" },
	{ id: 10, ipa: "ɛm", word: "em" },
	{ id: 11, ipa: "ɛl", word: "el" },
	{ id: 12, ipa: "al", word: "al" },
	{ id: 18, ipa: "i", word: "i" },
	{ id: 19, ipa: "lo", word: "lo" },
	{ id: 20, ipa: "lɛa", word: "lea" },
	{ id: 21, ipa: "la.ɛ", word: "læ" },
	{ id: 22, ipa: "li", word: "ly" },
];

export const PronomSujetChoices = convertDB(PronomSujetDB);
