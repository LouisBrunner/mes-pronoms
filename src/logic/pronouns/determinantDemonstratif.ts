import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const DeterminantDemonstratifDB: IPronounDB = [
	{ id: 0, ipa: "sɛks", word: "cèx" },
	{ id: 1, ipa: "sɛ", word: "cès" },
	{ id: 2, ipa: "sə / e / sɛt", word: "ce·tte" },
	{ id: 3, ipa: "sə", word: "ce" },
	{ id: 4, ipa: "sɛt", word: "cette" },
	{ id: 5, ipa: "sy", word: "çu" },
];

export const DeterminantDemonstratifChoices = convertDB(
	DeterminantDemonstratifDB,
);
