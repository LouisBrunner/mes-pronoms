import { useEffect, useRef } from "react";
import { PronounStore } from "@/logic/storage/store";
import type { IPronounStore } from "@/logic/types";

export const usePronouns = (data: string | null): IPronounStore => {
	const store = useRef<IPronounStore>(new PronounStore());
	useEffect(() => {
		if (data === null) {
			return;
		}
		store.current.init(data);
	}, [data]);
	return store.current;
};
