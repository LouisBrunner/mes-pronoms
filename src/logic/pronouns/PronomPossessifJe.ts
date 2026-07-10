import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const PronomPossessifJeDB: IPronounDB = [
	{ id: 0, ipa: "mjɛ̃ / e / mjɛn", word: "mien·ne" },
	{ id: 1, ipa: "mjɛm", word: "miem" },
	{ id: 2, ipa: "mjɛ̃", word: "mien" },
	{ id: 3, ipa: "mjɛn", word: "mienne" },
];

export const PronomPossessifJeChoices = convertDB(PronomPossessifJeDB);
