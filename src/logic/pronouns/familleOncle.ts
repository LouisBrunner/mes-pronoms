import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamilleOncleDB: IPronounDB = [
	{ id: 0, ipa: "tɑ̃kl", word: "tancle" },
	{ id: 1, ipa: "ɔ̃kl", word: "oncle" },
	{ id: 2, ipa: "tɑ̃t", word: "tante" },
];

export const FamilleOncleChoices = convertDB(FamilleOncleDB);
