import { Pencil } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router";
import { SimpleTooltip } from "@/components/common/SimpleTooltip.tsx";
import { PronounsLayout } from "@/components/pronouns/PronounsLayout.tsx";
import { PronounView } from "@/components/pronouns/PronounView.tsx";
import { buttonVariants } from "@/components/ui/button.tsx";
import { useAllPronouns } from "@/hooks/useAllPronouns.ts";
import { usePronounsFromQuery } from "@/hooks/usePronounsFromQuery.ts";
import { useShare } from "@/hooks/useShare.tsx";
import { useWatchPronouns } from "@/hooks/useWatchPronouns.ts";
import { makeURL } from "@/logic/utils.ts";

export const View = () => {
	const { navigate, store, compressed: compress } = usePronounsFromQuery();
	const { shareButton, tinyURL } = useShare({
		navigate,
		store,
		tinyURL: compress,
	});
	const [editURL, setEditURL] = useState(
		makeURL("e", store, { compress: tinyURL }),
	);
	const selections = useAllPronouns(store);

	useWatchPronouns({
		initial: true,
		observer: useCallback(() => {
			setEditURL(makeURL("e", store, { compress: tinyURL }));
		}, [store, tinyURL]),
		store,
	});

	const menuItems = (
		<>
			<SimpleTooltip tooltip="Éditer">
				<Link
					className={buttonVariants({ size: "icon", variant: "ghost" })}
					to={editURL}
				>
					<Pencil className="size-4" />
				</Link>
			</SimpleTooltip>

			{shareButton}
		</>
	);

	return (
		<PronounsLayout menuItems={menuItems} store={store}>
			{(pronoun) => (
				<PronounView
					key={pronoun}
					pronoun={pronoun}
					selections={selections}
					store={store}
				/>
			)}
		</PronounsLayout>
	);
};
