import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const TitreProfessionDB: IPronounDB = [
	{ id: 0, ipa: "di.ʁɛk.tœ.ʁis", word: "directeurice" },
	{ id: 1, ipa: "di.ʁɛk.tɛʁ", word: "directaire" },
	{ id: 2, ipa: "di.ʁɛk.tøs", word: "directeus" },
	{ id: 3, ipa: "di.ʁɛk.tœʁ", word: "directeur" },
	{ id: 4, ipa: "di.ʁɛk.tʁis", word: "directrice" },
];

export const TitreProfessionChoices = convertDB(TitreProfessionDB);
