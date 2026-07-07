import { Save } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Link } from "react-router";
import { SimpleTooltip } from "@/components/common/SimpleTooltip";
import { TooltipButton } from "@/components/common/TooltipButton";
import { PronounChooser } from "@/components/pronouns/form/PronounChooser";
import { PronounsLayout } from "@/components/pronouns/PronousLayout";
import { buttonVariants } from "@/components/ui/button";
import { usePronounsFromQuery } from "@/hooks/usePronounsFromQuery";
import { useWatchPronouns } from "@/hooks/useWatchPronouns";
import { makeURL } from "@/logic/helpers";
import { type PronounKind, PronounList } from "@/logic/types";

export const Edit = () => {
	const { navigate, store, compressed: compress } = usePronounsFromQuery();
	const [isValid, setValid] = useState(true);
	const [viewURL, setViewURL] = useState(makeURL("v", store, { compress }));

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
		<SimpleTooltip tooltip="Enregister/Partager">
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
				(allValid: boolean, pronoun: PronounKind): boolean => {
					return (validPronouns.current[pronoun] ?? false) && allValid;
				},
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
					onValid={(valid: boolean): void => {
						setValidFor(pronoun, valid);
					}}
					pronoun={pronoun}
					store={store}
				/>
			)}
		</PronounsLayout>
	);
};
