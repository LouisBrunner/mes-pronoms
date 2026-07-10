import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const PronomPossessifTuDB: IPronounDB = [
	{ id: 0, ipa: "tjɛ̃ / e / tjɛn", word: "tien·ne" },
	{ id: 1, ipa: "tjɛm", word: "tiem" },
	{ id: 2, ipa: "tjɛ̃", word: "tien" },
	{ id: 3, ipa: "tjɛn", word: "tienne" },
];

export const PronomPossessifTuChoices = convertDB(PronomPossessifTuDB);
