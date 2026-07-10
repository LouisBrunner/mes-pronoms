import { PronounCard } from "@/components/pronouns/PronounCard.tsx";
import { usePronoun } from "@/hooks/usePronoun.ts";
import { choosePronoun } from "@/logic/business.ts";
import type { PronounKind } from "@/logic/pronouns/index.ts";
import type {
	IPronounStore,
	PronounSelections,
} from "@/logic/storage/store.ts";

interface PronounViewProps {
	pronoun: PronounKind;
	selections: PronounSelections;
	store: IPronounStore;
}

export const PronounView = ({
	store,
	pronoun,
	selections,
}: PronounViewProps) => {
	const picked = usePronoun(store, pronoun);
	const choice = choosePronoun(pronoun, picked);

	return (
		<PronounCard
			choice={choice}
			pronoun={pronoun}
			selections={selections}
			showMissing
		/>
	);
};
