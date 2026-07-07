import type { PronounKind } from "@/logic/types";
import { capitalize } from "@/logic/utils";

export interface IPronounContent {
	readonly description: string;
	readonly examples: {
		singularWith(pronoun: string): string;
		pluralWith(pronoun: string): string;
	};
	readonly title: string;
}

export interface IPronounGrammar {
	readonly pronouns: {
		[P in PronounKind]: IPronounContent;
	};
}

export const GRAMMAR: IPronounGrammar = {
	pronouns: {
		PronomSujet: {
			description: "Le pronom sujet remplace le sujet dans une phrase",
			examples: {
				pluralWith(pronoun: string): string {
					return `Alex et ses amis vont en vacances. ${capitalize(pronoun)} partent en Catalogne.`;
				},
				singularWith(pronoun: string): string {
					return `Alex va à l'école. ${capitalize(pronoun)} aime bien l'anglais.`;
				},
			},
			title: "Pronom sujet",
		},
	},
};
