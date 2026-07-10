import { ChevronDownIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Layout } from "@/components/common/Layout.tsx";
import { PronounShortForm } from "@/components/pronouns/PronounShortForm.tsx";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import { PronounCategories, type PronounKind } from "@/logic/pronouns/index.ts";
import type { IPronounStore } from "@/logic/storage/store.ts";

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
			<main className="mx-auto max-w-5xl space-y-6 px-4 py-5">
				{PronounCategories.map((category) => (
					<Collapsible defaultOpen key={category.title}>
						<CollapsibleTrigger className="group flex items-center gap-2 font-heading font-semibold text-lg">
							<ChevronDownIcon className="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
							{category.title}
						</CollapsibleTrigger>
						<CollapsibleContent className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 xl:grid-cols-3">
							{category.pronouns.map(children)}
						</CollapsibleContent>
					</Collapsible>
				))}
			</main>
		</Layout>
	);
};
