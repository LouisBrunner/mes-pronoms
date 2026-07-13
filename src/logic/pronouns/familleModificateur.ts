import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const FamilleModificateurDB: IPronounDB = [
	{ id: 0, ipa: "pəti / gʁɑ̃ / bɛlo", word: "petix/granx/belleau" },
	{
		id: 1,
		ipa: "pəti / e / pətit / gʁɑ̃ / bo / e / bɛl",
		word: "petit·e/grand·e/beau·belle",
	},
	{ id: 2, ipa: "pəti / gʁɑ̃ / bo", word: "petit/grand/beau" },
	{ id: 3, ipa: "pətit / gʁɑ̃ / bɛl", word: "petite/grand/belle" },
];

export const FamilleModificateurChoices = convertDB(FamilleModificateurDB);
