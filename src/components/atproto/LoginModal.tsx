import { type FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Field, FieldLabel } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";

export type LoginModalProps = {
	onSignIn: (handle: string) => Promise<void>;
};

export const LoginModal = ({ onSignIn }: LoginModalProps) => {
	const [handle, setHandle] = useState("");
	const [pending, setPending] = useState(false);
	const id = useId();

	const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (!handle || pending) {
			return;
		}
		setPending(true);
		onSignIn(handle.trim().replace(/^@/, "")).catch(() => {
			setPending(false);
		});
	};

	return (
		<Dialog open>
			<DialogContent showCloseButton={false}>
				<DialogHeader>
					<DialogTitle>Connexion avec atproto</DialogTitle>
					<DialogDescription>
						Entrez votre identifiant Bluesky (par exemple @vous.bsky.social)
						pour créer ou modifier votre profil.
					</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-4" onSubmit={onSubmit}>
					<Field>
						<FieldLabel htmlFor={id}>Identifiant</FieldLabel>
						<Input
							autoFocus
							disabled={pending}
							id={id}
							onChange={(e) => setHandle(e.target.value)}
							placeholder="@vous.bsky.social"
							value={handle}
						/>
					</Field>
					<Button disabled={!handle || pending} type="submit">
						{pending ? "Redirection..." : "Se connecter"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
