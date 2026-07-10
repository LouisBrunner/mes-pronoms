import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamilleParentDB: IPronounDB = [
	{ id: 0, ipa: "paʁɑ̃", word: "parent" },
	{ id: 1, ipa: "mapa", word: "mapa" },
	{ id: 2, ipa: "pɛʁ", word: "père" },
	{ id: 3, ipa: "mɛʁ", word: "mère" },
];

export const FamilleParentChoices = convertDB(FamilleParentDB);
