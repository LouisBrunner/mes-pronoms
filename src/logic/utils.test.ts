import { describe, expect, it } from "bun:test";
import { capitalize, identity, isArray, pluralize } from "@/logic/utils";

describe("utils", () => {
	it("capitalizes the first letter", () => {
		expect(capitalize("iel")).toBe("Iel");
	});

	it("pluralizes by appending an s", () => {
		expect(pluralize("iel")).toBe("iels");
	});

	it("detects arrays", () => {
		expect(isArray([1, 2])).toBe(true);
		expect(isArray(1)).toBe(false);
	});

	it("returns the same value", () => {
		expect(identity("iel")).toBe("iel");
	});
});
