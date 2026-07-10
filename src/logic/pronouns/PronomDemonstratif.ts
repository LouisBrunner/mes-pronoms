import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const PronomDemonstratifDB: IPronounDB = [
	{ id: 0, ipa: ["sɛ.lɥi", "søl"], word: ["cellui", "ceulles"] },
	{ id: 5, ipa: ["sɛ.lɥi", "sɛ.lø"], word: ["cellui", "celleux"] },
	{ id: 6, ipa: ["sɛ.lɥi", "sø.z"], word: ["cellui", "ceuzes"] },
	{ id: 1, ipa: "sil", word: "cille" },
	{ id: 2, ipa: ["səlɥi", "sø"], word: ["celui", "ceux"] },
	{ id: 3, ipa: "sɛl", word: "celle" },
	{ id: 4, ipa: ["seal", "so.z"], word: ["céal", "çauz"] },
];

export const PronomDemonstratifChoices = convertDB(PronomDemonstratifDB);
