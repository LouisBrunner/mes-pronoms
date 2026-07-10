import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamilleEnfantDB: IPronounDB = [
	{ id: 0, ipa: "ɑ̃fɑ̃", word: "enfant" },
	{ id: 1, ipa: "fijis", word: "fillis" },
	{ id: 2, ipa: "fis", word: "fils" },
	{ id: 3, ipa: "fij", word: "fille" },
];

export const FamilleEnfantChoices = convertDB(FamilleEnfantDB);
