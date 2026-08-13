/** biome-ignore-all lint/correctness/noUnresolvedImports: TS is brain-damaged */
import { describe, expect, it } from "bun:test";
import { emptyStorage, type PronounsStorage } from "@/logic/storage/types.ts";
import { recordToStorage, storageToRecord } from "./record.ts";

describe("atproto record", () => {
	describe("storageToRecord", () => {
		it("resolves picked pronouns to their singular word form", () => {
			const store: PronounsStorage = emptyStorage();
			store.pronouns.PronomSujet = 0;
			store.pronouns.Tout = "toustes";

			const record = storageToRecord(store, {
				createdAt: "2026-01-01T00:00:00Z",
			});

			expect(record.$type).toBe("net.lbrunner.pronoms");
			expect(record.grammar.Tout).toBe("toustes");
			expect(record.grammar.PronomSujet).toBeDefined();
			expect(record.createdAt).toBe("2026-01-01T00:00:00Z");
		});

		it("omits unset categories", () => {
			const record = storageToRecord(emptyStorage(), {
				createdAt: "2026-01-01T00:00:00Z",
			});
			expect(record.grammar).toEqual({});
		});
	});

	describe("recordToStorage", () => {
		it("round-trips a free-text grammar entry", () => {
			const store = recordToStorage({ grammar: { Tout: "toustes" } });
			expect(store.pronouns.Tout).toBe("toustes");
		});

		it("re-matches a known preset back to its id", () => {
			const original: PronounsStorage = emptyStorage();
			original.pronouns.PronomSujet = 0;
			const record = storageToRecord(original, {
				createdAt: "2026-01-01T00:00:00Z",
			});

			const restored = recordToStorage(record);

			expect(restored.pronouns.PronomSujet).toBe(0);
		});
	});
});
