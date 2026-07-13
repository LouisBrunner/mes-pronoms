import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const PronomObjetDB: IPronounDB = [
	{ id: 0, ipa: "jɛl", word: "iel" },
	{ id: 1, ipa: ["ɛ.lɥi", "ɛ.lø"], word: ["ellui", "elleux"] },
	{ id: 7, ipa: ["ɛ.lɥi", "øl"], word: ["ellui", "eulles"] },
	{ id: 8, ipa: ["ɛ.lɥi", "øx"], word: ["ellui", "euxes"] },
	{ id: 2, ipa: ["lɥi", "ø"], word: ["lui", "eux"] },
	{ id: 3, ipa: "ɛl", word: "elle" },
	{ id: 4, ipa: "il", word: "ille" },
	{ id: 5, ipa: "al", word: "al" },
	{ id: 6, ipa: ["lɥ", "o.z"], word: ["lu", "auz"] },
];

export const PronomObjetChoices = convertDB(PronomObjetDB);
