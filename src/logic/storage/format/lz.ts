// biome-ignore lint/correctness/noUnresolvedImports: broken
import { compressToBase64, decompressFromBase64 } from "lz-string";
import {
	deserializeBinary,
	serializeBinary,
} from "@/logic/storage/format/binary.ts";
import type { WireFormat } from "@/logic/storage/format/types.ts";
import type { PronounsStorage } from "@/logic/storage/types.ts";

const compress = (store: PronounsStorage): string =>
	compressToBase64(serializeBinary(store));

const decompress = (raw: string): PronounsStorage =>
	deserializeBinary(decompressFromBase64(raw));

export const LZ_FORMAT: WireFormat = {
	compress,
	decompress,
	prefix: "z",
};
