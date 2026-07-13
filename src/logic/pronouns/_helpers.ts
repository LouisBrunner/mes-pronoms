export type IPronounDBEntry = {
	id: number;
} & (
	| {
			ipa: string;
			word: string;
	  }
	| {
			ipa: DualForm;
			word: DualForm;
	  }
);

export type PronounForm =
	| {
			type: "single";
			singular: string;
	  }
	| {
			type: "dual";
			singular: string;
			plural: string;
	  };

const pluralDelimiter = " / ";

export type DualForm = [string, string];
export type WordForm = string | DualForm;

export const parseForm = (word: WordForm): PronounForm => {
	if (typeof word !== "string") {
		return {
			plural: word[1],
			singular: word[0],
			type: "dual",
		};
	}

	if (word.includes(pluralDelimiter)) {
		const parts = word.split(" / ");
		if (parts.length === 2) {
			return {
				plural: parts[1] as string,
				singular: parts[0] as string,
				type: "dual",
			};
		}
	}

	return {
		singular: word,
		type: "single",
	};
};

export const getPronounSingular = (word: WordForm): string => {
	const forms = parseForm(word);
	return forms.singular;
};

export const composePronouns = (word: WordForm): string => {
	if (typeof word === "string") {
		return word;
	}
	return word.join(pluralDelimiter);
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
