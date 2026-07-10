import { AL } from "@/logic/presets/al.ts";
import { ELLE } from "@/logic/presets/elle.ts";
import { IEL } from "@/logic/presets/iel.ts";
import { IL } from "@/logic/presets/il.ts";
import type { PronounsStorage } from "@/logic/storage/types.ts";

export const PRESETS: Record<string, PronounsStorage> = {
	al: AL,
	elle: ELLE,
	iel: IEL,
	il: IL,
};
