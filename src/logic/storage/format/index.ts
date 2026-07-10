import { LZ_FORMAT } from "@/logic/storage/format/lz.ts";
import { TEXT_FORMAT } from "@/logic/storage/format/text.ts";

import type { PronounsStorage } from "@/logic/storage/types.ts";

export const WIRE_FORMATS = {
	[TEXT_FORMAT.prefix]: TEXT_FORMAT,
	[LZ_FORMAT.prefix]: LZ_FORMAT,
};

const FORMATS = Object.keys(WIRE_FORMATS);

export const benchmarkFormats = (
	store: PronounsStorage,
): Record<string, string> => {
	const results: Record<string, string> = {};
	for (const prefix of FORMATS) {
		const format = WIRE_FORMATS[prefix];
		if (format === undefined) {
			continue;
		}
		results[prefix] = format.compress(store);
	}
	return results;
};
