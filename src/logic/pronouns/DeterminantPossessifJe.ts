import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const DeterminantPossessifJeDB: IPronounDB = [
	{ id: 0, ipa: "ma.ɔ̃", word: "maon" },
	{ id: 1, ipa: "mɑ̃", word: "man" },
	{ id: 2, ipa: "my", word: "mu" },
	{ id: 3, ipa: "mɔ̃", word: "mon" },
	{ id: 4, ipa: "ma", word: "ma" },
];

export const DeterminantPossessifJeChoices = convertDB(
	DeterminantPossessifJeDB,
);
