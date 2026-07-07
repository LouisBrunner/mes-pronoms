import { usePronoun } from "@/hooks/usePronoun";
import { choosePronoun } from "@/logic/business";
import type { IPronounStore, PronounKind } from "@/logic/types";
import { PronounCard } from "./PronounCard";

interface PronounViewProps {
	pronoun: PronounKind;
	store: IPronounStore;
}

export const PronounView = ({ store, pronoun }: PronounViewProps) => {
	const picked = usePronoun(store, pronoun);
	const choice = choosePronoun(pronoun, picked);

	return <PronounCard choice={choice} pronoun={pronoun} showMissing />;
};
