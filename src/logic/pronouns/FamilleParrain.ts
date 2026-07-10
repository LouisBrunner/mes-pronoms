import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamilleParrainDB: IPronounDB = [
	{ id: 0, ipa: "pa.ʁɛn", word: "parraine" },
	{ id: 1, ipa: "ma.ʁɛ̃", word: "marrain" },
	{ id: 2, ipa: "pa.ʁɛ̃", word: "parrain" },
	{ id: 3, ipa: "ma.ʁɛn", word: "marraine" },
];

export const FamilleParrainChoices = convertDB(FamilleParrainDB);
