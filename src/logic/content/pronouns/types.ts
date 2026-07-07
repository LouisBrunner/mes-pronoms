export interface IPronounDBEntry {
	readonly id: number;
	readonly ipa: string;
	readonly word: string;
}
export type IPronounDB = IPronounDBEntry[];

export type IPronounChoice = Omit<IPronounDBEntry, "id">;
export type IPronounsChoice = {
	lookup: Record<number, IPronounChoice>;
	db: IPronounDB;
};

export const convertDB = (db: IPronounDB): IPronounsChoice => {
	const choices: IPronounsChoice = {
		db,
		lookup: {},
	};
	for (const entry of db) {
		choices.lookup[entry.id] = entry;
	}
	return choices;
};
