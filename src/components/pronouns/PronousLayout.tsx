import type { ReactNode } from "react";
import { Layout } from "@/components/common/Layout";
import { PronounShortForm } from "@/components/pronouns/PronounShortForm";
import {
	type IPronounStore,
	type PronounKind,
	PronounList,
} from "@/logic/types";

export type PronounsLayoutProps = {
	store: IPronounStore;
	menuItems: ReactNode;
	children: (pronoun: PronounKind) => ReactNode;
};

export const PronounsLayout = ({
	menuItems,
	store,
	children,
}: PronounsLayoutProps) => {
	const menu = (
		<>
			<PronounShortForm store={store} />

			<div className="grow" />

			{menuItems}
		</>
	);

	return (
		<Layout menu={menu} title={store.shortForm()}>
			<main className="mx-auto max-w-5xl px-4 py-5 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
				{PronounList.map(children)}
			</main>
		</Layout>
	);
};
