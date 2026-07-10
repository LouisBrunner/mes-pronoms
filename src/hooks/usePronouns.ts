import { useEffect, useRef } from "react";
import { type IPronounStore, PronounStore } from "@/logic/storage/store.ts";

export const usePronouns = (data: string | null): IPronounStore => {
	const store = useRef<IPronounStore>(new PronounStore());
	useEffect(() => {
		if (data === null) {
			return;
		}
		store.current.update(data);
	}, [data]);
	return store.current;
};
