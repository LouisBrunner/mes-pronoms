import { choosePronoun, computeShortForm } from "@/logic/business.ts";
import { getPronounSingular } from "@/logic/pronouns/_helpers.ts";
import { type PronounKind, PronounList } from "@/logic/pronouns/index.ts";
import { ensureChoice } from "@/logic/storage/format/common.ts";
import { emptyStorage, type PronounsStorage } from "@/logic/storage/types.ts";

export const PRONOMS_NSID = "net.lbrunner.pronoms";

export type PronomsGrammar = Partial<Record<PronounKind, string>>;

export type PronomsRecord = {
	$type: typeof PRONOMS_NSID;
	shortForm?: string;
	grammar: PronomsGrammar;
	createdAt: string;
	updatedAt?: string;
};

export const storageToRecord = (
	store: PronounsStorage,
	{ createdAt, updatedAt }: { createdAt: string; updatedAt?: string },
): PronomsRecord => {
	const grammar: PronomsGrammar = {};
	for (const pronoun of PronounList) {
		const chosen = choosePronoun(pronoun, store.pronouns[pronoun])?.word;
		if (chosen !== undefined) {
			grammar[pronoun] = getPronounSingular(chosen);
		}
	}
	return {
		$type: PRONOMS_NSID,
		createdAt,
		grammar,
		shortForm: computeShortForm(store.pronouns),
		updatedAt,
	};
};

export const recordToStorage = (
	record: Pick<PronomsRecord, "grammar">,
): PronounsStorage => {
	const store = emptyStorage();
	for (const pronoun of PronounList) {
		const word = record.grammar[pronoun];
		if (word !== undefined) {
			store.pronouns[pronoun] = ensureChoice(pronoun, word);
		}
	}
	return store;
};
