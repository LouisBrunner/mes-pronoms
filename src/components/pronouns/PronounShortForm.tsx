import { useCallback, useState } from "react";
import { Copiable } from "@/components/common/Copiable.tsx";
import { useWatchPronouns } from "@/hooks/useWatchPronouns.ts";
import type { IPronounStore } from "@/logic/storage/store.ts";

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
