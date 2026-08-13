/** biome-ignore-all lint/style/useGlobalThis: I need it */
import { toast } from "sonner";
import { isDev } from "@/config.ts";
import { computeShortForm } from "@/logic/business.ts";
import type { PronounKind } from "@/logic/pronouns/index.ts";
import { ensureChoice } from "@/logic/storage/format/common.ts";
import { benchmarkFormats } from "@/logic/storage/format/index.ts";
import { packStore, unpackStore } from "@/logic/storage/packing.ts";
import {
	type ExportOptions,
	emptyStorage,
	type PronounPick,
	type PronounsStorage,
} from "@/logic/storage/types.ts";

declare global {
	interface Window {
		benchmarkFormats?: (store?: PronounsStorage) => Record<string, string>;
		store?: IPronounStore;
	}
}

export type PronounChangeEventDetails =
	| {
			pronoun: PronounKind;
			choice: PronounPick | undefined;
	  }
	| Record<string, never>;
export type PronounChangeEvent = CustomEvent<PronounChangeEventDetails>;

export type PronounSelections = Partial<Record<PronounKind, PronounPick>>;

const isSamePronouns = (
	a: PronounsStorage["pronouns"],
	b: PronounsStorage["pronouns"],
): boolean => {
	const aKeys = Object.keys(a) as PronounKind[];
	const bKeys = Object.keys(b) as PronounKind[];
	if (aKeys.length !== bKeys.length) {
		return false;
	}
	return aKeys.every((key) => a[key] === b[key]);
};

export interface IPronounStore extends EventTarget {
	export: ({ compress }: ExportOptions) => string;

	get: (pronoun: PronounKind) => PronounPick | undefined;
	getAll: () => PronounSelections;

	load: (data: PronounsStorage) => void;
	set: (pronoun: PronounKind, choice: PronounPick | undefined) => void;
	shortForm: () => string | undefined;
	update: (data: string) => void;
}

export class PronounStore extends EventTarget implements IPronounStore {
	#store: PronounsStorage;
	#cachedExport: Record<string, string>;

	constructor() {
		super();
		this.#cachedExport = {};
		this.#store = emptyStorage();

		if (isDev && typeof window !== "undefined") {
			window.store = this;
			window.benchmarkFormats = (
				store?: PronounsStorage,
			): Record<string, string> => benchmarkFormats(store ?? this.#store);
		}
	}

	update(data: string): void {
		let next: PronounsStorage;
		try {
			next = unpackStore(data);
		} catch (e) {
			const err = e as Error;
			toast.error(`Impossible de lire les pronoms : ${err.message}`);
			next = emptyStorage();
		}
		this.load(next);
	}

	load(next: PronounsStorage): void {
		if (isSamePronouns(this.#store.pronouns, next.pronouns)) {
			return;
		}
		this.#store = next;
		this.#cachedExport = {};
		this.dispatchEvent(
			new CustomEvent<PronounChangeEventDetails>("changed", { detail: {} }),
		);
	}

	get(pronoun: PronounKind): PronounPick | undefined {
		return this.#store.pronouns[pronoun];
	}

	getAll(): PronounSelections {
		return { ...this.#store.pronouns };
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
		return computeShortForm(this.#store.pronouns);
	}

	export(options: ExportOptions): string {
		const cacheKey = options.compress ? "compressed" : "non-compress";
		if (this.#cachedExport[cacheKey] !== undefined) {
			return this.#cachedExport[cacheKey];
		}
		this.#cachedExport[cacheKey] = packStore(this.#store, options);
		return this.#cachedExport[cacheKey];
	}
}
