import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const DeterminantPossessifDB: IPronounDB = [
	{ id: 0, ipa: "sa.ɔ̃", word: "saon" },
	{ id: 1, ipa: "sɑ̃", word: "san" },
	{ id: 2, ipa: "sɔ̃", word: "son" },
	{ id: 3, ipa: "sa", word: "sa" },
	{ id: 4, ipa: "sy", word: "su" },
];

export const DeterminantPossessifChoices = convertDB(DeterminantPossessifDB);
