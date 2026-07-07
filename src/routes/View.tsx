import { Pencil } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router";
import { SimpleTooltip } from "@/components/common/SimpleTooltip";
import { PronounView } from "@/components/pronouns/PronounView";
import { PronounsLayout } from "@/components/pronouns/PronousLayout";
import { buttonVariants } from "@/components/ui/button";
import { usePronounsFromQuery } from "@/hooks/usePronounsFromQuery";
import { useShare } from "@/hooks/useShare";
import { useWatchPronouns } from "@/hooks/useWatchPronouns";
import { makeURL } from "@/logic/helpers";

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
				<PronounView key={pronoun} pronoun={pronoun} store={store} />
			)}
		</PronounsLayout>
	);
};
