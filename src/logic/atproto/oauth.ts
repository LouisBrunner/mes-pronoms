import { Agent } from "@atproto/api";
import {
	BrowserOAuthClient,
	type OAuthSession,
} from "@atproto/oauth-client-browser";
import { isDev } from "@/config.ts";
import { PRONOMS_NSID } from "@/logic/atproto/record.ts";

const SCOPE = `atproto repo:${PRONOMS_NSID}`;

const clientId = isDev
	? `http://localhost?redirect_uri=${encodeURIComponent("http://127.0.0.1:5173/u/me")}&scope=${encodeURIComponent(SCOPE)}`
	: "https://mes-pronoms.lbrunner.net/client-metadata.json";

let clientPromise: Promise<BrowserOAuthClient> | undefined;

export const getOAuthClient = (): Promise<BrowserOAuthClient> => {
	clientPromise ??= BrowserOAuthClient.load({
		clientId,
		handleResolver: "https://bsky.social",
	});
	return clientPromise;
};

export const signIn = async (handle: string): Promise<void> => {
	const client = await getOAuthClient();
	await client.signIn(handle);
};

export const signOut = async (session: OAuthSession): Promise<void> => {
	await session.signOut();
};

export const agentFromSession = (session: OAuthSession): Agent =>
	new Agent(session);
