import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const ToutDB: IPronounDB = [
	{ id: 0, ipa: "tust", word: "touste" },
	{ id: 1, ipa: "tu", word: "tout" },
	{ id: 2, ipa: "tut", word: "toute" },
	{ id: 3, ipa: "tuks", word: "touxe" },
	{ id: 4, ipa: "tu / e / tut", word: "tout·e" },
	{ id: 5, ipa: "tuz", word: "touz" },
	{ id: 6, ipa: "tuz", word: "touze" },
];

export const ToutChoices = convertDB(ToutDB);
