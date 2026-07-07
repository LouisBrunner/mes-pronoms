import { isDev } from "@/config";
import { choosePronoun, ensureChoice } from "@/logic/business";
import { benchmarkFormats } from "@/logic/storage/format";
import { packStore, unpackStore } from "@/logic/storage/packing";
import { emptyStorage, type PronounsStorage } from "@/logic/storage/types";
import type {
	ExportOptions,
	IPronounStore,
	PronounChangeEventDetails,
	PronounKind,
	PronounPick,
} from "@/logic/types";

declare global {
	interface Window {
		benchmarkFormats?: (store?: PronounsStorage) => Record<string, string>;
		store?: IPronounStore;
	}
}

export class PronounStore extends EventTarget implements IPronounStore {
	#store: PronounsStorage;
	#cachedExport: Record<string, string>;

	constructor() {
		super();
		this.#cachedExport = {};
		this.#store = emptyStorage();
	}

	init(data: string): void {
		try {
			this.#store = unpackStore(data);
		} catch (e) {
			const err = e as Error;
			console.error(`failed to parse: ${err.message}`);
			this.#store = emptyStorage();
		}
		this.#cachedExport = {};
		this.dispatchEvent(
			new CustomEvent<PronounChangeEventDetails>("changed", { detail: {} }),
		);

		if (isDev && typeof window !== "undefined") {
			window.store = this;
			window.benchmarkFormats = (
				store: PronounsStorage = this.#store,
			): Record<string, string> => {
				return benchmarkFormats(store);
			};
		}
	}

	get(pronoun: PronounKind): PronounPick | undefined {
		return this.#store.pronouns[pronoun];
	}

	set(pronoun: PronounKind, choiceRaw: PronounPick | undefined): void {
		let choice = choiceRaw;
		if (typeof choiceRaw === "string") {
			choice = ensureChoice(pronoun, choiceRaw);
		}

		if (this.#store.pronouns[pronoun] === choice) {
			return;
		}
		this.#store.pronouns[pronoun] = choice;
		this.#cachedExport = {};
		this.dispatchEvent(
			new CustomEvent<PronounChangeEventDetails>("changed", {
				detail: { choice, pronoun },
			}),
		);
	}

	shortForm(): string | undefined {
		const includes: PronounKind[] = ["PronomSujet"];
		if (
			includes.find((pronoun) => {
				return this.#store.pronouns[pronoun] === undefined;
			})
		) {
			return undefined;
		}
		return includes
			.map((pronoun) => {
				return choosePronoun(pronoun, this.#store.pronouns[pronoun])?.word;
			})
			.join("/");
	}

	export(options: ExportOptions): string {
		const cacheKey = options.compress ? "compressed" : "non-compress";
		if (this.#cachedExport?.[cacheKey] !== undefined) {
			return this.#cachedExport[cacheKey];
		}
		this.#cachedExport[cacheKey] = packStore(this.#store, options);
		return this.#cachedExport[cacheKey];
	}
}
