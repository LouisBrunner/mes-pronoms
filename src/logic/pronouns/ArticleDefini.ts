import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const ArticleDefiniDB: IPronounDB = [
	{ id: 0, ipa: "lja", word: "lia" },
	{ id: 1, ipa: "li", word: "li" },
	{ id: 2, ipa: "lo", word: "lo" },
	{ id: 3, ipa: "ly", word: "lu" },
	{ id: 4, ipa: "lə", word: "le" },
	{ id: 5, ipa: "la", word: "la" },
	{ id: 6, ipa: "lea", word: "lea" },
];

export const ArticleDefiniChoices = convertDB(ArticleDefiniDB);
