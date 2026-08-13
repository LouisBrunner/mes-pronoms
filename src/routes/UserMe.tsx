import { LogOut, Save, Share2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LoginModal } from "@/components/atproto/LoginModal.tsx";
import { Copiable } from "@/components/common/Copiable.tsx";
import { TooltipButton } from "@/components/common/TooltipButton.tsx";
import { PronounChooser } from "@/components/pronouns/form/PronounChooser.tsx";
import { PronounsLayout } from "@/components/pronouns/PronounsLayout.tsx";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { baseURL } from "@/config.ts";
import { useAllPronouns } from "@/hooks/useAllPronouns.ts";
import { useAtprotoSession } from "@/hooks/useAtprotoSession.ts";
import { getPronomsRecord, savePronomsRecord } from "@/logic/atproto/client.ts";
import type { PronomsRecord } from "@/logic/atproto/record.ts";
import { recordToStorage, storageToRecord } from "@/logic/atproto/record.ts";
import { type PronounKind, PronounList } from "@/logic/pronouns/index.ts";
import { PronounStore } from "@/logic/storage/store.ts";

export const UserMe = () => {
	const auth = useAtprotoSession();
	const store = useRef(new PronounStore()).current;
	const selections = useAllPronouns(store);
	const [isValid, setValid] = useState(true);
	const [existing, setExisting] = useState<PronomsRecord | undefined>();
	const [loadingRecord, setLoadingRecord] = useState(true);
	const [saving, setSaving] = useState(false);
	const validPronouns = useRef<Partial<Record<PronounKind, boolean>>>({});

	const did = auth.status === "signedIn" ? auth.session.did : undefined;

	useEffect(() => {
		if (!did) {
			return;
		}
		let cancelled = false;
		setLoadingRecord(true);
		getPronomsRecord(did)
			.then((record) => {
				if (cancelled) {
					return;
				}
				if (record) {
					setExisting(record);
					store.load(recordToStorage(record));
				}
			})
			.finally(() => {
				if (!cancelled) {
					setLoadingRecord(false);
				}
			});
		return (): void => {
			cancelled = true;
		};
	}, [did, store]);

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

	const onSave = useCallback(async (): Promise<void> => {
		if (auth.status !== "signedIn") {
			return;
		}
		setSaving(true);
		try {
			const now = new Date().toISOString();
			const record = storageToRecord(
				{ pronouns: store.getAll() },
				{ createdAt: existing?.createdAt ?? now, updatedAt: now },
			);
			await savePronomsRecord(auth.session, record);
			setExisting(record);
			toast.success("Profil enregistré");
		} catch (err) {
			toast.error("Erreur lors de l'enregistrement", { description: `${err}` });
		} finally {
			setSaving(false);
		}
	}, [auth, store, existing]);

	if (
		auth.status === "loading" ||
		(auth.status === "signedIn" && loadingRecord)
	) {
		return (
			<PronounsLayout menuItems={null} store={store}>
				{() => null}
			</PronounsLayout>
		);
	}

	if (auth.status === "signedOut") {
		return <LoginModal onSignIn={auth.signIn} />;
	}

	const profileURL = `${baseURL}/u/${auth.session.did}`;

	const menuItems = (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<TooltipButton size="icon" tooltip="Partager" variant="ghost">
						<Share2 className="size-4" />
					</TooltipButton>
				</PopoverTrigger>
				<PopoverContent align="center" className="flex flex-col gap-3 me-2">
					<Copiable className="bg-primary/15 hover:bg-primary/25">
						{profileURL}
					</Copiable>
				</PopoverContent>
			</Popover>

			<TooltipButton
				disabled={!isValid || saving}
				onClick={onSave}
				size="icon"
				tooltip="Enregistrer"
				variant="ghost"
			>
				{saving ? <Spinner /> : <Save className="size-4" />}
			</TooltipButton>

			<TooltipButton
				onClick={auth.signOut}
				size="icon"
				tooltip="Se déconnecter"
				variant="ghost"
			>
				<LogOut className="size-4" />
			</TooltipButton>
		</>
	);

	return (
		<PronounsLayout menuItems={menuItems} store={store}>
			{(pronoun) => (
				<PronounChooser
					key={pronoun}
					onValid={setValidFor}
					pronoun={pronoun}
					selections={selections}
					store={store}
				/>
			)}
		</PronounsLayout>
	);
};
