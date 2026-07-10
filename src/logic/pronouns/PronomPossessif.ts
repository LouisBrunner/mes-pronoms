import { convertDB, type IPronounDB } from "@/logic/pronouns/_helpers.ts";

export const PronomPossessifDB: IPronounDB = [
	{ id: 0, ipa: "sjɛ̃ / e / sjɛn", word: "sien·ne" },
	{ id: 1, ipa: "sjɛm", word: "siem" },
	{ id: 2, ipa: "sjɛ̃", word: "sien" },
	{ id: 3, ipa: "sjɛn", word: "sienne" },
];

export const PronomPossessifChoices = convertDB(PronomPossessifDB);
