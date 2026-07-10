import { useCallback, useState } from "react";
import { useWatchPronouns } from "@/hooks/useWatchPronouns.ts";
import type { PronounKind } from "@/logic/pronouns/index.ts";
import type {
	IPronounStore,
	PronounChangeEvent,
} from "@/logic/storage/store.ts";
import type { PronounPick } from "@/logic/storage/types.ts";

export const usePronoun = (
	store: IPronounStore,
	pronoun: PronounKind,
): PronounPick | undefined => {
	const [picked, setPicked] = useState(store.get(pronoun));

	useWatchPronouns({
		initial: true,
		observer: useCallback(
			(e: PronounChangeEvent | null) => {
				if (
					e !== null &&
					e.detail !== null &&
					"pronoun" in e.detail &&
					e.detail.pronoun !== pronoun
				) {
					return;
				}
				setPicked(store.get(pronoun));
			},
			[store, pronoun],
		),
		store,
	});

	return picked;
};
