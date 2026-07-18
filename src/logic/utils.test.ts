/** biome-ignore-all lint/suspicious/noExplicitAny: required for parametrized */
/** biome-ignore-all lint/correctness/noUnresolvedImports: TS is brain-damaged */
import { describe, expect, it, mock } from "bun:test";
import type { IPronounStore } from "@/logic/storage/store.ts";
import type { ExportOptions } from "@/logic/storage/types.ts";
import { capitalize, identity, makeURL } from "./utils.ts";

describe("utils", () => {
	describe("capitalize", () => {
		const cases = [
			["iel", "Iel"],
			["ça", "Ça"],
			["élève", "Élève"],
			["über", "Über"],
		];

		it.each(
			cases,
		)("capitalizes %s to %s", (input: string, expected: string) => {
			expect(capitalize(input)).toBe(expected);
		});
	});

	describe("identity", () => {
		const cases: [any][] = [["iel"], [42], [{ key: "value" }], [[1, 2, 3]]];

		it.each(cases)("returns the same value for %p", (input: any) => {
			expect(identity(input)).toBe(input);
		});
	});

	describe("makeURL", () => {
		const cases: [string, string, ExportOptions, string][] = [
			["v", "data", { compress: true }, "/v/data"],
			["e", "data", { compress: false }, "/e/data"],
		];

		it.each(
			cases,
		)("creates URL for action %s with data %s and options %p: %s", (action: string, data: string, options: ExportOptions, expected: string) => {
			const mockStore = {
				export: mock(() => data),
			} as unknown as IPronounStore;

			expect(makeURL(action as "v" | "e", mockStore, options)).toBe(expected);
			expect(mockStore.export).toHaveBeenCalledWith(options);
		});
	});
});
