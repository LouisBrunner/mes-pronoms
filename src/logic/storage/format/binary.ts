import { PronounList } from "@/logic/pronouns/index.ts";
import { parseChoice } from "@/logic/storage/format/common.ts";
import { emptyStorage, type PronounsStorage } from "@/logic/storage/types.ts";

const UNSET = String.fromCharCode(0);
const STRING_MARKER = String.fromCharCode(1);
const STRING_TERMINATOR = String.fromCharCode(2);
const NUMBER_OFFSET = 3;

const RESERVED_CODEPOINTS = new RegExp(
	`[${UNSET}${STRING_MARKER}${STRING_TERMINATOR}]`,
	"g",
);
const sanitizeWriteIn = (s: string): string =>
	s.replace(RESERVED_CODEPOINTS, "");

export const serializeBinary = (store: PronounsStorage): string => {
	const chars: string[] = [];
	for (const p of PronounList) {
		const pick = store.pronouns[p];
		if (pick === undefined) {
			chars.push(UNSET);
		} else if (typeof pick === "string") {
			chars.push(STRING_MARKER, sanitizeWriteIn(pick), STRING_TERMINATOR);
		} else {
			chars.push(String.fromCharCode(pick + NUMBER_OFFSET));
		}
	}
	let end = chars.length;
	while (end > 0 && chars[end - 1] === UNSET) {
		end -= 1;
	}
	return chars.slice(0, end).join("");
};

export const deserializeBinary = (raw: string): PronounsStorage => {
	const store = emptyStorage();
	let i = 0;
	for (const pronoun of PronounList) {
		if (i >= raw.length) {
			break;
		}
		if (raw[i] === STRING_MARKER) {
			const end = raw.indexOf(STRING_TERMINATOR, i + 1);
			if (end === -1) {
				throw new Error(`unterminated write-in for '${pronoun}'`);
			}
			store.pronouns[pronoun] = raw.slice(i + 1, end);
			i = end + 1;
			continue;
		}
		const code = (raw.charCodeAt(i) ?? 0) - NUMBER_OFFSET;
		i += 1;
		if (code < 0) {
			continue;
		}
		store.pronouns[pronoun] = parseChoice(pronoun, code.toString(10));
	}
	return store;
};
