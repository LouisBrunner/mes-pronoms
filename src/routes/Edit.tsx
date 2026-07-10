import { Save } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Link } from "react-router";
import { SimpleTooltip } from "@/components/common/SimpleTooltip.tsx";
import { TooltipButton } from "@/components/common/TooltipButton.tsx";
import { PronounChooser } from "@/components/pronouns/form/PronounChooser.tsx";
import { PronounsLayout } from "@/components/pronouns/PronounsLayout.tsx";
import { buttonVariants } from "@/components/ui/button.tsx";
import { useAllPronouns } from "@/hooks/useAllPronouns.ts";
import { usePronounsFromQuery } from "@/hooks/usePronounsFromQuery.ts";
import { useWatchPronouns } from "@/hooks/useWatchPronouns.ts";
import { type PronounKind, PronounList } from "@/logic/pronouns/index.ts";
import { makeURL } from "@/logic/utils.ts";

export const Edit = () => {
	const { navigate, store, compressed: compress } = usePronounsFromQuery();
	const [isValid, setValid] = useState(true);
	const [viewURL, setViewURL] = useState(makeURL("v", store, { compress }));
	const selections = useAllPronouns(store);

	useWatchPronouns({
		initial: () => {
			setViewURL(makeURL("v", store, { compress }));
		},
		observer: useCallback(() => {
			setViewURL(makeURL("v", store, { compress }));
			navigate(makeURL("e", store, { compress }), { replace: true });
		}, [navigate, compress, store]),
		store,
	});

	const menuItems = isValid ? (
		<SimpleTooltip tooltip="Enregistrer/Partager">
			<Link
				className={buttonVariants({ size: "icon", variant: "ghost" })}
				to={viewURL}
			>
				<Save className="size-4" />
			</Link>
		</SimpleTooltip>
	) : (
		<TooltipButton disabled size="icon" tooltip="Invalide" variant="ghost">
			<Save className="size-4" />
		</TooltipButton>
	);

	const validPronouns = useRef<Partial<Record<PronounKind, boolean>>>({});
	const setValidFor = useCallback(
		(pronoun: PronounKind, valid: boolean): void => {
			validPronouns.current[pronoun] = valid;
			const reduced = PronounList.reduce<boolean>(
				(allValid: boolean, kind: PronounKind): boolean =>
					(validPronouns.current[kind] ?? false) && allValid,
				true,
			);
			setValid(reduced);
		},
		[],
	);

	return (
		<PronounsLayout menuItems={menuItems} store={store}>
			{(pronoun) => (
				<PronounChooser
					key={pronoun}
					// biome-ignore lint/performance/noJsxPropsBind: but I don't want to
					onValid={(valid: boolean): void => {
						setValidFor(pronoun, valid);
					}}
					pronoun={pronoun}
					selections={selections}
					store={store}
				/>
			)}
		</PronounsLayout>
	);
};
