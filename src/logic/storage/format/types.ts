import type { PronounsStorage } from "@/logic/storage/types.ts";

export interface WireFormat {
	compress: (s: PronounsStorage) => string;
	decompress: (s: string) => PronounsStorage;
	prefix: string;
}
