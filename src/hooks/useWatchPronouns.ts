import { useEffect } from "react";
import type { IPronounStore, PronounChangeEvent } from "@/logic/types";

export type useWatchPronounsProps = {
	store: IPronounStore;
	initial?: true | (() => void);
	observer: (e: PronounChangeEvent | null) => void;
};

export const useWatchPronouns = ({
	store,
	initial,
	observer,
}: useWatchPronounsProps): void => {
	// biome-ignore lint/correctness/useExhaustiveDependencies: initial is intentionally excluded to only run once
	useEffect(() => {
		if (!initial) {
			return;
		}
		if (typeof initial === "boolean") {
			observer(null);
		} else {
			initial();
		}
	}, [observer]);

	useEffect(() => {
		store.addEventListener("changed", observer as EventListener);
		return (): void => {
			store.removeEventListener("changed", observer as EventListener);
		};
	}, [store, observer]);
};
