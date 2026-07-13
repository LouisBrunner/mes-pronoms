/** biome-ignore-all lint/correctness/noUnresolvedImports: TS is brain-damaged */
import { describe, expect, it } from "bun:test";
import {
	composePronouns,
	getPronounSingular,
	type PronounForm,
	parseForm,
	type WordForm,
} from "./_helpers.ts";

describe("_helpers", () => {
	describe("parseForm", () => {
		const cases: [string, WordForm, PronounForm][] = [
			[
				"single word from the pronouns",
				"iel",
				{ singular: "iel", type: "single" },
			],
			[
				"double word from the pronouns",
				["lui", "eux"],
				{ plural: "eux", singular: "lui", type: "dual" },
			],
			["write in", "moitest", { singular: "moitest", type: "single" }],
			[
				"write in with custom plural",
				"moi / moiz",
				{ plural: "moiz", singular: "moi", type: "dual" },
			],
			[
				"write in with multiple words",
				"mon ami extraordinaire",
				{ singular: "mon ami extraordinaire", type: "single" },
			],
			[
				"write in with point median",
				"ami·e",
				{ singular: "ami·e", type: "single" },
			],
			[
				"write in with multiple words joined by / (no spacing)",
				"petit/grand/beau",
				{ singular: "petit/grand/beau", type: "single" },
			],
			[
				"write in with point median and / without spacing",
				"petit·e/grand·e/beau·belle",
				{ singular: "petit·e/grand·e/beau·belle", type: "single" },
			],
			[
				"write in with more than one custom plural delimiter",
				"a / b / c",
				{ singular: "a / b / c", type: "single" },
			],
		];

		it.each(
			cases,
		)("parses %s (%p)", (_label: string, input: WordForm, expected: PronounForm) => {
			expect(parseForm(input)).toEqual(expected);
		});
	});

	describe("getPronounSingular", () => {
		const cases: [string, WordForm, string][] = [
			["single word from the pronouns", "iel", "iel"],
			["double word from the pronouns", ["lui", "eux"], "lui"],
			["write in", "moitest", "moitest"],
			["write in with custom plural", "moi / moiz", "moi"],
			[
				"write in with multiple words",
				"mon ami extraordinaire",
				"mon ami extraordinaire",
			],
			["write in with point median", "ami·e", "ami·e"],
			[
				"write in with multiple words joined by / (no spacing)",
				"petit/grand/beau",
				"petit/grand/beau",
			],
			[
				"write in with point median and / without spacing",
				"petit·e/grand·e/beau·belle",
				"petit·e/grand·e/beau·belle",
			],
		];

		it.each(
			cases,
		)("returns the singular for %s (%p)", (_label: string, input: WordForm, expected: string) => {
			expect(getPronounSingular(input)).toBe(expected);
		});
	});

	describe("composePronouns", () => {
		const cases: [string, WordForm, string][] = [
			["single word from the pronouns", "iel", "iel"],
			["double word from the pronouns", ["lui", "eux"], "lui / eux"],
			["write in", "moitest", "moitest"],
			[
				"write in with custom plural (already a string)",
				"moi / moiz",
				"moi / moiz",
			],
			[
				"write in with multiple words",
				"mon ami extraordinaire",
				"mon ami extraordinaire",
			],
			["write in with point median", "ami·e", "ami·e"],
			[
				"write in with multiple words joined by / (no spacing)",
				"petit/grand/beau",
				"petit/grand/beau",
			],
			[
				"write in with point median and / without spacing",
				"petit·e/grand·e/beau·belle",
				"petit·e/grand·e/beau·belle",
			],
		];

		it.each(
			cases,
		)("composes %s (%p) into %s", (_label: string, input: WordForm, expected: string) => {
			expect(composePronouns(input)).toBe(expected);
		});
	});
});
