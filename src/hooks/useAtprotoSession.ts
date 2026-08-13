import type { OAuthSession } from "@atproto/oauth-client-browser";
import { useCallback, useEffect, useState } from "react";
import {
	getOAuthClient,
	signIn as startSignIn,
} from "@/logic/atproto/oauth.ts";

export type AtprotoSessionState =
	| { status: "loading" }
	| { status: "signedOut" }
	| { status: "signedIn"; session: OAuthSession };

export type UseAtprotoSession = AtprotoSessionState & {
	signIn: (handle: string) => Promise<void>;
	signOut: () => Promise<void>;
};

export const useAtprotoSession = (): UseAtprotoSession => {
	const [state, setState] = useState<AtprotoSessionState>({
		status: "loading",
	});

	useEffect(() => {
		let cancelled = false;
		getOAuthClient()
			.then((client) => client.init())
			.then((result) => {
				if (cancelled) {
					return;
				}
				setState(
					result
						? { session: result.session, status: "signedIn" }
						: { status: "signedOut" },
				);
			})
			.catch(() => {
				if (!cancelled) {
					setState({ status: "signedOut" });
				}
			});
		return (): void => {
			cancelled = true;
		};
	}, []);

	const signIn = useCallback(async (handle: string): Promise<void> => {
		await startSignIn(handle);
	}, []);

	const signOut = useCallback(async (): Promise<void> => {
		if (state.status === "signedIn") {
			await state.session.signOut();
			setState({ status: "signedOut" });
		}
	}, [state]);

	return { ...state, signIn, signOut };
};
