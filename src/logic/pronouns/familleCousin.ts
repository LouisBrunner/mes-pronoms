import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamilleCousinDB: IPronounDB = [
	{ id: 0, ipa: "ku.zɛn", word: "cousaine" },
	{ id: 1, ipa: "ku.zɑ̃", word: "cousan" },
	{ id: 2, ipa: "ku.zɛ̃", word: "cousin" },
	{ id: 3, ipa: "ku.zin", word: "cousine" },
];

export const FamilleCousinChoices = convertDB(FamilleCousinDB);
