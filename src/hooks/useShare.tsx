import { Share, Share2 } from "lucide-react";
import {
	type ReactNode,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";
import type { NavigateFunction } from "react-router";
import { Copiable } from "@/components/common/Copiable.tsx";
import { TooltipButton } from "@/components/common/TooltipButton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Field, FieldLabel } from "@/components/ui/field.tsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { baseURL } from "@/config.ts";
import type { IPronounStore } from "@/logic/storage/store.ts";
import { makeURL } from "@/logic/utils.ts";

export type ShareProps = {
	navigate: NavigateFunction;
	store: IPronounStore;
	tinyURL: boolean;
};

export type ShareState = {
	shareButton: ReactNode;
	tinyURL: boolean;
};

export const useShare = ({
	navigate,
	store,
	tinyURL: initialTinyURL,
}: ShareProps): ShareState => {
	const [tinyURL, setTinyURL] = useState(initialTinyURL);
	const id = useId();

	// catch the real value of compress once it's loaded
	useEffect(() => {
		setTinyURL(initialTinyURL);
	}, [initialTinyURL]);

	const doShare = useCallback(async () => {
		await navigator.share({
			text: "Utilisez cette référence quand vous devez utiliser des pronoms pour me désigner",
			title: "Mes Pronoms",
			url: baseURL + makeURL("v", store, { compress: tinyURL }),
		});
	}, [tinyURL, store]);

	const onTinyURLChange = useCallback(
		(checked: boolean): void => {
			setTinyURL(checked);
			navigate(makeURL("v", store, { compress: checked }), { replace: true });
		},
		[navigate, store],
	);

	const shareButton = useMemo(() => {
		let content: ReactNode;
		if (typeof navigator !== "undefined" && "share" in navigator) {
			content = (
				<Button className="mx-auto flex gap-1" onClick={doShare}>
					<Share className="size-4" />
					Partager
				</Button>
			);
		} else {
			content = (
				<Copiable className="bg-primary/15 hover:bg-primary/25">
					{baseURL + makeURL("v", store, { compress: tinyURL })}
				</Copiable>
			);
		}

		return (
			<Popover>
				<PopoverTrigger asChild>
					<TooltipButton size="icon" tooltip="Partager" variant="ghost">
						<Share2 className="size-4" />
					</TooltipButton>
				</PopoverTrigger>
				<PopoverContent align="center" className="flex flex-col gap-3 me-2">
					{content}

					<Field orientation="horizontal">
						<Checkbox
							checked={tinyURL}
							id={id}
							onCheckedChange={onTinyURLChange}
						/>
						<FieldLabel htmlFor={id}>URL compacte ?</FieldLabel>
					</Field>
				</PopoverContent>
			</Popover>
		);
	}, [id, doShare, onTinyURLChange, store, tinyURL]);

	return {
		shareButton,
		tinyURL,
	};
};
