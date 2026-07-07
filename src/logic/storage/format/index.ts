import { LZ_FORMAT } from "@/logic/storage/format/lz";
import { TEXT_FORMAT } from "@/logic/storage/format/text";
import type { PronounsStorage } from "@/logic/storage/types";

export { LZ_FORMAT, TEXT_FORMAT };

export const WIRE_FORMATS = {
	[TEXT_FORMAT.prefix]: TEXT_FORMAT,
	[LZ_FORMAT.prefix]: LZ_FORMAT,
};

export const benchmarkFormats = (
	store: PronounsStorage,
): Record<string, string> => {
	const results: Record<string, string> = {};
	for (const prefix in WIRE_FORMATS) {
		results[prefix] = WIRE_FORMATS[prefix].compress(store);
	}
	return results;
};
