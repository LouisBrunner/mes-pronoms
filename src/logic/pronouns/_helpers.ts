export type IPronounDBEntry = {
	id: number;
} & (
	| {
			ipa: string;
			word: string;
	  }
	| {
			ipa: [string, string];
			word: [string, string];
	  }
);

export const isSimpleForm = (word: string | string[]): word is string =>
	typeof word === "string";

export const getPronounSingular = (word: string | string[]): string => {
	if (isSimpleForm(word)) {
		return word;
	}
	return word[0] as string;
};

export const composePronouns = (word: string | string[]): string => {
	if (isSimpleForm(word)) {
		return word;
	}
	return word.join(" / ");
};

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
