import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamilleBelleFamilleDB: IPronounDB = [
	{ id: 0, ipa: "ʒɑ̃dʁ", word: "gendre" },
	{ id: 1, ipa: "bʁy", word: "bru" },
	{ id: 2, ipa: "bo.fis", word: "beau-fils" },
	{ id: 3, ipa: "bɛl.fij", word: "belle-fille" },
	{
		id: 4,
		ipa: ["bɛ.l‿ɑ̃.fɑ̃", "bo.z‿ɑ̃.fɑ̃"],
		word: ["bel-enfant", "beaux-enfants"],
	},
];

export const FamilleBelleFamilleChoices = convertDB(FamilleBelleFamilleDB);
