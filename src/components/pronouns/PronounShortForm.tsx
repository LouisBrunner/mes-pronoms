import { useCallback, useState } from "react";
import { Copiable } from "@/components/common/Copiable";
import { useWatchPronouns } from "@/hooks/useWatchPronouns";
import type { IPronounStore } from "@/logic/types";

export type PronounShortFormProps = {
	store: IPronounStore;
};

export const PronounShortForm = ({ store }: PronounShortFormProps) => {
	const [shortForm, setShortForm] = useState(store.shortForm());

	useWatchPronouns({
		initial: true,
		observer: useCallback(() => {
			setShortForm(store.shortForm());
		}, [store]),
		store,
	});

	if (shortForm === undefined) {
		return null;
	}

	return (
		<Copiable className="bg-primary-foreground/15 hover:bg-primary-foreground/25">
			{shortForm}
		</Copiable>
	);
};
