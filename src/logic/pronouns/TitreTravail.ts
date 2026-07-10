import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const TitreAdminDB: IPronounDB = [
	{ id: 0, ipa: "miks", word: "Mixe" },
	{ id: 1, ipa: "mə.sjø", word: "Monsieur" },
	{ id: 2, ipa: "ma.dam", word: "Madame" },
];

export const TitreAdminChoices = convertDB(TitreAdminDB);
