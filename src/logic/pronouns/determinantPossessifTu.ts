import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const DeterminantPossessifTuDB: IPronounDB = [
	{ id: 0, ipa: "ta.ɔ̃", word: "taon" },
	{ id: 1, ipa: "tɑ̃", word: "tan" },
	{ id: 2, ipa: "ty", word: "tu" },
	{ id: 3, ipa: "tɔ̃", word: "ton" },
	{ id: 4, ipa: "ta", word: "ta" },
];

export const DeterminantPossessifTuChoices = convertDB(
	DeterminantPossessifTuDB,
);
