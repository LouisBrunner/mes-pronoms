import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamilleNeveuDB: IPronounDB = [
	{ id: 0, ipa: "nə.vɛs", word: "nevèce" },
	{ id: 1, ipa: "nɛs", word: "ness" },
	{ id: 2, ipa: "nə.vø", word: "neveu" },
	{ id: 3, ipa: "njɛs", word: "nièce" },
];

export const FamilleNeveuChoices = convertDB(FamilleNeveuDB);
