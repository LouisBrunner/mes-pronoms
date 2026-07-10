import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamilleFratrieDB: IPronounDB = [
	{ id: 0, ipa: "fʁœʁ", word: "frœur" },
	{ id: 1, ipa: "a.dɛlf", word: "adelphe" },
	{ id: 2, ipa: "fʁɛʁ", word: "frère" },
	{ id: 3, ipa: "sœʁ", word: "sœur" },
];

export const FamilleFratrieChoices = convertDB(FamilleFratrieDB);
