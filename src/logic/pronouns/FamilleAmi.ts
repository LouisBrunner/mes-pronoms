import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamilleAmiDB: IPronounDB = [
	{ id: 0, ipa: ["a.mi", "a.mi"], word: ["amix", "amix"] },
	{ id: 4, ipa: ["a.mi", "a.mi"], word: ["amix", "amixs"] },
	{ id: 5, ipa: ["a.mi", "a.mi"], word: ["amix", "amiz"] },
	{ id: 1, ipa: "pɔt", word: "pote" },
	{ id: 2, ipa: "a.mi", word: "ami" },
	{ id: 3, ipa: "a.mi", word: "amie" },
	{ id: 6, ipa: "kɔ.pɛn", word: "copaine" },
];

export const FamilleAmiChoices = convertDB(FamilleAmiDB);
