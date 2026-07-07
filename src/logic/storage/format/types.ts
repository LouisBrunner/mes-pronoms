import type { PronounsStorage } from "@/logic/storage/types";

export interface WireFormat {
	compress: (s: PronounsStorage) => string;
	decompress: (s: string) => PronounsStorage;
	prefix: string;
}
