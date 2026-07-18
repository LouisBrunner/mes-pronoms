/** biome-ignore-all lint/style/useNamingConvention: wrong */
/** biome-ignore-all lint/correctness/noUnresolvedImports: TS is brain-damaged */
import { describe, expect, it } from "bun:test";
import type { WordForm } from "@/logic/pronouns/_helpers.ts";
import type { PronounKind } from "@/logic/pronouns/index.ts";
import type { PronounSelections } from "@/logic/storage/store.ts";
import { getForms, mustEllide, pluralize, resolvePronouns } from "./helpers.ts";

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

		it.each(cases)(
			'pluralizes "%s" to "%s"',
			(kind: PronounKind, input: string, expected: string) => {
				expect(pluralize(kind, input)).toBe(expected);
			},
		);
	});

	describe("mustEllide", () => {
		const cases: [string, string, boolean][] = [
			["single word from the pronouns", "iel", true],
			["single word from the pronouns", "il", true],
			["double word from the pronouns (singular)", "lui", false],
			["double word from the pronouns (plural)", "eux", true],
			["write in", "truc", false],
			["write in", "ami", true],
			["write in with custom plural (singular)", "orange", true],
			["write in with multiple words", "mon ami", false],
			["write in with multiple words (vowel start)", "amis proches", true],
			["write in with point median", "petit·e", false],
			["write in with point median (vowel start)", "ami·e", true],
			["write in with / without spacing", "petit/grand/beau", false],
			["starts with h", "héros", true],
			["starts with accented vowel", "élève", true],
		];

		it.each(cases)(
			"elides %s (%p): %p",
			(_label: string, word: string, expected: boolean) => {
				expect(mustEllide(word)).toBe(expected);
			},
		);
	});

	describe("getForms", () => {
		const cases: [string, PronounKind, WordForm, [string, string]][] = [
			["single word from the pronouns", "PronomSujet", "iel", ["iel", "iels"]],
			[
				"double word from the pronouns",
				"PronomObjet",
				["lui", "eux"],
				["lui", "eux"],
			],
			["write in", "PronomSujet", "moi", ["moi", "mois"]],
			[
				"write in with custom plural",
				"PronomSujet",
				"moi / moiz",
				["moi", "moiz"],
			],
			[
				"write in with multiple words",
				"PronomSujet",
				"mon ami extraordinaire",
				["mon ami extraordinaire", "mon ami extraordinaires"],
			],
			[
				"write in with point median",
				"PronomSujet",
				"ami·e",
				["ami·e", "ami·e·s"],
			],
			[
				"write in with multiple words joined by / and point median",
				"FamilleModificateur",
				"petit·e/grand·e/beau·belle",
				["petit·e/grand·e/beau·belle", "petit·e·s/grand·e·s/beau·belle·s"],
			],
		];

		it.each(cases)(
			"resolves forms for %s (%p): %p",
			(_label: string, kind: PronounKind, word: WordForm, expected: [
				string,
				string,
			]) => {
				expect(getForms(kind, word)).toEqual(expected);
			},
		);
	});

	describe("resolvePronouns", () => {
		const cases: [string, PronounKind, PronounSelections, [string, string]][] =
			[
				[
					"single word from the pronouns",
					"PronomSujet",
					{ PronomSujet: 0 },
					["iel", "iels"],
				],
				[
					"double word from the pronouns",
					"PronomObjet",
					{ PronomObjet: 2 },
					["lui", "eux"],
				],
				["write in", "PronomSujet", { PronomSujet: "moi" }, ["moi", "mois"]],
				[
					"write in with custom plural",
					"PronomSujet",
					{ PronomSujet: "moi / moiz" },
					["moi", "moiz"],
				],
				[
					"write in with multiple words",
					"PronomSujet",
					{ PronomSujet: "mon ami extraordinaire" },
					["mon ami extraordinaire", "mon ami extraordinaires"],
				],
				[
					"write in with point median",
					"PronomSujet",
					{ PronomSujet: "ami·e" },
					["ami·e", "ami·e·s"],
				],
				[
					"write in with multiple words joined by / and point median",
					"FamilleModificateur",
					{ FamilleModificateur: "petit·e/grand·e/beau·belle" },
					["petit·e/grand·e/beau·belle", "petit·e·s/grand·e·s/beau·belle·s"],
				],
				[
					"missing selection falls back to the first DB entry",
					"PronomSujet",
					{},
					["iel", "iels"],
				],
			];

		it.each(cases)(
			"resolves %s (%p): %p",
			(_label: string, kind: PronounKind, selections: PronounSelections, expected: [
				string,
				string,
			]) => {
				expect(resolvePronouns(kind, selections)).toEqual(expected);
			},
		);
	});
});
