import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const AccordsParticipeGroupe3DB: IPronounDB = [
	{ id: 0, ipa: "pʁiks", word: "prisx" },
	{ id: 1, ipa: "pʁi / e / pʁiz", word: "pris·e" },
	{ id: 2, ipa: "pʁi", word: "pris" },
	{ id: 3, ipa: "pʁiz", word: "prise" },
];

export const AccordsParticipeGroupe3Choices = convertDB(
	AccordsParticipeGroupe3DB,
);
