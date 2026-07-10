import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const AccordsAdjectifsDB: IPronounDB = [
	{ id: 0, ipa: "kɔ̃.tɑ̃.ks", word: "contenx" },
	{ id: 1, ipa: "kɔ̃.tɑ̃.s", word: "contens" },
	{ id: 2, ipa: "kɔ̃.tɑ̃", word: "content" },
	{ id: 3, ipa: "kɔ̃.tɑ̃.t", word: "contente" },
	{ id: 4, ipa: "kɔ̃.tɑ̃.ks", word: "contenxe" },
	{ id: 5, ipa: "kɔ̃.tɑ̃ / e / kɔ̃.tɑ̃.t", word: "content·e" },
];

export const AccordsAdjectifsChoices = convertDB(AccordsAdjectifsDB);
