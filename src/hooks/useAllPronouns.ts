import { useCallback, useState } from "react";
import { useWatchPronouns } from "@/hooks/useWatchPronouns.ts";
import type {
	IPronounStore,
	PronounSelections,
} from "@/logic/storage/store.ts";

export const useAllPronouns = (store: IPronounStore): PronounSelections => {
	const [selections, setSelections] = useState(store.getAll());

	useWatchPronouns({
		initial: true,
		observer: useCallback(() => {
			setSelections(store.getAll());
		}, [store]),
		store,
	});

	return selections;
};
