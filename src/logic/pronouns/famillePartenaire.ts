import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamillePartenaireDB: IPronounDB = [
	{ id: 0, ipa: "paʁ.tə.nɛʁ", word: "partenaire" },
	{ id: 1, ipa: "kɔ̃.ʒwɛ̃ / e / kɔ̃.ʒwɛ̃t", word: "conjoint·e" },
	{ id: 2, ipa: "kɔ.pɛ̃", word: "copain" },
	{ id: 3, ipa: "kɔ.pin", word: "copine" },
	{ id: 4, ipa: "kɔ.pɛn", word: "copaine" },
];

export const FamillePartenaireChoices = convertDB(FamillePartenaireDB);
