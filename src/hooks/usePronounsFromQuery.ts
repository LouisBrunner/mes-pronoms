import { useNavigate, useParams } from "react-router";
import { usePronouns } from "@/hooks/usePronouns";
import { isCompressed } from "@/logic/storage/packing";
import type { IPronounStore } from "@/logic/types";

export type usePronounsFromQueryState = {
	navigate: ReturnType<typeof useNavigate>;
	store: IPronounStore;
	compressed: boolean;
};

export const usePronounsFromQuery = (): usePronounsFromQueryState => {
	const navigate = useNavigate();
	const { "*": pack } = useParams();
	const data = pack ? pack : null;
	return {
		compressed: data ? isCompressed(data) : false,
		navigate,
		store: usePronouns(data),
	};
};
