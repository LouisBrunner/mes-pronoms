/** biome-ignore-all lint/correctness/noUnresolvedImports: TS is brain-damaged */
import { describe, expect, it } from "bun:test";
import type { PronounKind } from "@/logic/pronouns/index.ts";
import { pluralize } from "./helpers.ts";

describe("utils", () => {
	describe("pluralize", () => {
		const cases: [PronounKind, string, string][] = [
			["PronomSujet", "iel", "iels"],

			["DeterminantPossessif", "saon", "ses"],
			["DeterminantPossessif", "san", "ses"],
			["DeterminantPossessif", "son", "ses"],
			["DeterminantPossessif", "sa", "ses"],
			["DeterminantPossessif", "su", "ses"],

			["DeterminantPossessifJe", "maon", "mes"],
			["DeterminantPossessifJe", "man", "mes"],
			["DeterminantPossessifJe", "mon", "mes"],
			["DeterminantPossessifJe", "ma", "mes"],
			["DeterminantPossessifJe", "mu", "mes"],

			["DeterminantPossessifTu", "taon", "tes"],
			["DeterminantPossessifTu", "tan", "tes"],
			["DeterminantPossessifTu", "ton", "tes"],
			["DeterminantPossessifTu", "ta", "tes"],
			["DeterminantPossessifTu", "tu", "tes"],

			["DeterminantDemonstratif", "cèx", "ces"],
			["DeterminantDemonstratif", "cès", "ces"],
			["DeterminantDemonstratif", "çu", "ces"],
			["DeterminantDemonstratif", "ce", "ces"],
			["DeterminantDemonstratif", "cette", "ces"],

			["PronomSujet", "beau", "beaux"],
			["PronomSujet", "chapeau", "chapeaux"],
			["PronomSujet", "celui", "celuis"],
			["PronomSujet", "lui", "luis"],
			["PronomSujet", "neveu", "neveux"],
			["PronomSujet", "tout", "tous"],

			["PronomSujet", "allé·e", "allé·e·s"],
			["PronomSujet", "petit·e", "petit·e·s"],
			["PronomSujet", "mien·ne", "mien·ne·s"],
			["PronomSujet", "sien·ne", "sien·ne·s"],
			["PronomSujet", "tien·ne", "tien·ne·s"],

			["PronomSujet", "directeus", "directeus"],
			["PronomSujet", "contenx", "contenxs"],

			["FamilleModificateur", "petit/grand/beau", "petits/grand/beaux"],
			[
				"FamilleModificateur",
				"petit·e/grand·e/beau·belle",
				"petit·e·s/grand·e·s/beau·belle·s",
			],
			["FamilleModificateur", "petix/granx/belleau", "petixs/granxs/belleaux"],
			["FamilleModificateur", "petite/grand/belle", "petites/grand/belles"],
		];

		it.each(
			cases,
		)('pluralizes "%s" to "%s"', (kind: PronounKind, input: string, expected: string) => {
			expect(pluralize(kind, input)).toBe(expected);
		});
	});
});
