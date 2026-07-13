import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const ArticlePartitifDB: IPronounDB = [
	{ id: 0, ipa: "di", word: "di" },
	{ id: 1, ipa: "də / li", word: "de li" },
	{ id: 2, ipa: "do", word: "do" },
	{ id: 3, ipa: "də / lo", word: "de lo" },
	{ id: 4, ipa: "dy", word: "du" },
	{ id: 5, ipa: "də / la", word: "de la" },
	{ id: 6, ipa: "də / ly", word: "de lu" },
];

export const ArticlePartitifChoices = convertDB(ArticlePartitifDB);
