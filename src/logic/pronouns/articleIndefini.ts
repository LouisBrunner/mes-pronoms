import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const ArticleIndefiniDB: IPronounDB = [
	{ id: 0, ipa: "œ̃ / e / yn", word: "un·e" },
	{ id: 1, ipa: "œm", word: "um" },
	{ id: 2, ipa: "o", word: "o" },
	{ id: 3, ipa: "œ̃", word: "un" },
	{ id: 4, ipa: "yn", word: "une" },
	{ id: 5, ipa: "ɑ̃", word: "an" },
];

export const ArticleIndefiniChoices = convertDB(ArticleIndefiniDB);
