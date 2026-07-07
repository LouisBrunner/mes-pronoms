import { compressToBase64, decompressFromBase64 } from "lz-string";
import { deserialize, serialize } from "@/logic/storage/format/common";
import type { WireFormat } from "@/logic/storage/format/types";
import type { PronounsStorage } from "@/logic/storage/types";
import { identity } from "@/logic/utils";

const compress = (store: PronounsStorage): string => {
	return compressToBase64(serialize(store, identity));
};

const decompress = (raw: string): PronounsStorage => {
	return deserialize(decompressFromBase64(raw), identity);
};

export const LZ_FORMAT: WireFormat = {
	compress,
	decompress,
	prefix: "z",
};
