import { deserialize, serialize } from "@/logic/storage/format/common.ts";
import type { WireFormat } from "@/logic/storage/format/types.ts";
import type { PronounsStorage } from "@/logic/storage/types.ts";

const compress = (store: PronounsStorage): string =>
	serialize(store, encodeURIComponent);

const decompress = (raw: string): PronounsStorage =>
	deserialize(raw, decodeURIComponent);

export const TEXT_FORMAT: WireFormat = {
	compress,
	decompress,
	prefix: "t",
};
