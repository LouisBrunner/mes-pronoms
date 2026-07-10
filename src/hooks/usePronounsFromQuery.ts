import { useNavigate, useParams } from "react-router";
import { usePronouns } from "@/hooks/usePronouns.ts";
import { isCompressed } from "@/logic/storage/packing.ts";
import type { IPronounStore } from "@/logic/storage/store.ts";

export type PronounsFromQueryState = {
	navigate: ReturnType<typeof useNavigate>;
	store: IPronounStore;
	compressed: boolean;
};

export const usePronounsFromQuery = (): PronounsFromQueryState => {
	const navigate = useNavigate();
	const { "*": pack } = useParams();
	const data = pack ? pack : null;
	return {
		compressed: data ? isCompressed(data) : true,
		navigate,
		store: usePronouns(data),
	};
};
