import { Agent } from "@atproto/api";
import type { OAuthSession } from "@atproto/oauth-client-browser";
import { PRONOMS_NSID, type PronomsRecord } from "@/logic/atproto/record.ts";

const PUBLIC_APPVIEW = "https://public.api.bsky.app";

const publicAgent = new Agent(PUBLIC_APPVIEW);

export type BskyProfile = {
	did: string;
	handle: string;
	displayName?: string;
	avatar?: string;
};

export const getProfile = async (did: string): Promise<BskyProfile> => {
	const { data } = await publicAgent.getProfile({ actor: did });
	return {
		avatar: data.avatar,
		did: data.did,
		displayName: data.displayName,
		handle: data.handle,
	};
};

export const getPronomsRecord = async (
	did: string,
): Promise<PronomsRecord | undefined> => {
	try {
		const { data } = await publicAgent.com.atproto.repo.getRecord({
			collection: PRONOMS_NSID,
			repo: did,
			rkey: "self",
		});
		return data.value as PronomsRecord;
	} catch {
		return undefined;
	}
};

export const savePronomsRecord = async (
	session: OAuthSession,
	record: Omit<PronomsRecord, "$type">,
): Promise<void> => {
	const agent = new Agent(session);
	await agent.com.atproto.repo.putRecord({
		collection: PRONOMS_NSID,
		record: { $type: PRONOMS_NSID, ...record },
		repo: session.did,
		rkey: "self",
	});
};
