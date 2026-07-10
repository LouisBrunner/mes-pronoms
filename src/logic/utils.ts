import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { IPronounStore } from "@/logic/storage/store.ts";
import type { ExportOptions } from "@/logic/storage/types.ts";

export const makeURL = (
	action: "v" | "e",
	store: IPronounStore,
	options: ExportOptions,
): string => `/${action}/${store.export(options)}`;

export const capitalize = (s: string): string =>
	s.charAt(0).toUpperCase() + s.slice(1);

export const identity = <T>(s: T): T => s;

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
