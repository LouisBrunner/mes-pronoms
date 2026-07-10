import { PRESETS } from "@/logic/presets/index.ts";
import type { PronounKind } from "@/logic/pronouns/index.ts";
import { WIRE_FORMATS } from "@/logic/storage/format/index.ts";
import { LZ_FORMAT } from "@/logic/storage/format/lz.ts";
import { TEXT_FORMAT } from "@/logic/storage/format/text.ts";
import type { ExportOptions, PronounsStorage } from "@/logic/storage/types.ts";

const HEADER_DELIM = "-";

const matchesPreset = (
	store: PronounsStorage,
	preset: PronounsStorage,
): boolean => {
	const storeKeys = Object.keys(store.pronouns) as PronounKind[];
	const presetKeys = Object.keys(preset.pronouns) as PronounKind[];
	if (storeKeys.length !== presetKeys.length) {
		return false;
	}
	return storeKeys.every((key) => store.pronouns[key] === preset.pronouns[key]);
};

const findPresetAlias = (store: PronounsStorage): string | undefined => {
	for (const [alias, preset] of Object.entries(PRESETS)) {
		if (matchesPreset(store, preset)) {
			return alias;
		}
	}
};

export const isCompressed = (raw: string): boolean => {
	if (raw in PRESETS) {
		return true;
	}
	const format = raw[0];
	return format !== undefined && WIRE_FORMATS[format] === LZ_FORMAT;
};

export const unpackStore = (raw: string): PronounsStorage => {
	const preset = PRESETS[raw];
	if (preset !== undefined) {
		return { pronouns: { ...preset.pronouns } };
	}
	const format = raw[0];
	if (format === undefined) {
		throw new Error(`invalid format '${format}'`);
	}
	const wformat = WIRE_FORMATS[format];
	if (wformat === undefined) {
		throw new Error(`unknown format '${format}'`);
	}
	if (raw[1] !== HEADER_DELIM) {
		throw new Error(`invalid header '${raw[1]} vs ${HEADER_DELIM}'`);
	}
	return wformat.decompress(raw.slice(2));
};

export const packStore = (
	store: PronounsStorage,
	{ compress }: ExportOptions,
): string => {
	const alias = findPresetAlias(store);
	if (alias !== undefined) {
		return alias;
	}
	const format = compress ? LZ_FORMAT : TEXT_FORMAT;
	return [format.prefix, format.compress(store)].join(HEADER_DELIM);
};
