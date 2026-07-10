import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const AccordsParticipeGroupe12DB: IPronounDB = [
	{ id: 0, ipa: "ale", word: "allæ" },
	{ id: 1, ipa: "ale", word: "allé·e" },
	{ id: 2, ipa: "ale", word: "allé" },
	{ id: 3, ipa: "ale", word: "allée" },
];

export const AccordsParticipeGroupe12Choices = convertDB(
	AccordsParticipeGroupe12DB,
);
