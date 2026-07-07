import { deserialize, serialize } from "@/logic/storage/format/common";
import type { WireFormat } from "@/logic/storage/format/types";
import type { PronounsStorage } from "@/logic/storage/types";

const compress = (store: PronounsStorage): string => {
	return serialize(store, encodeURIComponent);
};

const decompress = (raw: string): PronounsStorage => {
	return deserialize(raw, decodeURIComponent);
};

export const TEXT_FORMAT: WireFormat = {
	compress,
	decompress,
	prefix: "t",
};
