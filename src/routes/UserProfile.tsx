import { AlertCircleIcon, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Layout } from "@/components/common/Layout.tsx";
import { PronounsLayout } from "@/components/pronouns/PronounsLayout.tsx";
import { PronounView } from "@/components/pronouns/PronounView.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { useAllPronouns } from "@/hooks/useAllPronouns.ts";
import {
	type BskyProfile,
	getProfile,
	getPronomsRecord,
} from "@/logic/atproto/client.ts";
import { recordToStorage } from "@/logic/atproto/record.ts";
import { PronounStore } from "@/logic/storage/store.ts";

const ProfileHeader = ({ profile }: { profile: BskyProfile | undefined }) => (
	<div className="mx-auto flex max-w-5xl items-center gap-3 px-4 pt-5">
		{profile?.avatar ? (
			<img
				alt={profile.displayName ?? profile.handle}
				className="size-12 rounded-full object-cover"
				src={profile.avatar}
			/>
		) : (
			<UserRound className="size-12 rounded-full bg-muted p-2" />
		)}
		<div>
			<p className="font-semibold leading-tight">
				{profile?.displayName ?? profile?.handle ?? "..."}
			</p>
			{profile?.displayName ? (
				<p className="text-muted-foreground text-sm leading-tight">
					@{profile.handle}
				</p>
			) : null}
		</div>
	</div>
);

export const UserProfile = () => {
	const { did } = useParams();
	const store = useRef(new PronounStore()).current;
	const selections = useAllPronouns(store);
	const [profile, setProfile] = useState<BskyProfile | undefined>();
	const [notFound, setNotFound] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!did) {
			return;
		}
		let cancelled = false;
		setLoading(true);
		Promise.all([getProfile(did), getPronomsRecord(did)])
			.then(([fetchedProfile, record]) => {
				if (cancelled) {
					return;
				}
				setProfile(fetchedProfile);
				if (record) {
					store.load(recordToStorage(record));
				} else {
					setNotFound(true);
				}
			})
			.catch(() => {
				if (!cancelled) {
					setNotFound(true);
				}
			})
			.finally(() => {
				if (!cancelled) {
					setLoading(false);
				}
			});
		return (): void => {
			cancelled = true;
		};
	}, [did, store]);

	if (loading) {
		return <Layout>{null}</Layout>;
	}

	if (notFound) {
		return (
			<Layout title={profile?.handle}>
				<ProfileHeader profile={profile} />
				<main className="mx-auto max-w-xl p-4">
					<Alert variant="default">
						<AlertCircleIcon />
						<AlertTitle>Non renseigné</AlertTitle>
						<AlertDescription>
							Cette personne n'a pas encore renseigné ses pronoms via atproto.
						</AlertDescription>
					</Alert>
				</main>
			</Layout>
		);
	}

	return (
		<PronounsLayout
			header={<ProfileHeader profile={profile} />}
			menuItems={null}
			store={store}
		>
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
