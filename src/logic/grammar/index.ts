/** biome-ignore-all lint/style/useNamingConvention: I want it */

import type { PronounKind } from "@/logic/pronouns/index.ts";

export interface IPronounContent {
	readonly description: string;
	readonly title: string;
}

export type IPronounGrammar = Record<PronounKind, IPronounContent>;

export const GRAMMAR: IPronounGrammar = {
	AccordsAdjectifs: {
		description: "L'accord en genre d'un adjectif (content, contente...)",
		title: "Adjectifs",
	},
	AccordsParticipeGroupe3: {
		description:
			"L'accord en genre d'un participe passé irrégulier du 3e groupe, où l'accord peut s'entendre à l'oral (pris, prise...)",
		title: "Participe passé (3e groupe)",
	},
	AccordsParticipeGroupe12: {
		description:
			"L'accord en genre d'un participe passé du 1er ou 2e groupe (allé, allée...)",
		title: "Participe passé (1er/2e groupe)",
	},
	ArticleDefini: {
		description:
			"L'article défini précède un nom déjà connu ou déterminé (le, la...)",
		title: "Article défini",
	},
	ArticleIndefini: {
		description: "L'article indéfini précède un nom non déterminé (un, une...)",
		title: "Article indéfini",
	},
	ArticlePartitif: {
		description:
			"La combinaison de la préposition « de » et de l'article défini (du, de la...)",
		title: "Article partitif",
	},
	DeterminantDemonstratif: {
		description:
			"Le déterminant démonstratif précède un nom pour le désigner (ce, cette...)",
		title: "Déterminant démonstratif",
	},
	DeterminantPossessif: {
		description:
			"Le déterminant possessif précède un nom pour indiquer que celui-ci appartient à la personne (son, sa...)",
		title: "Déterminant possessif (3e personne)",
	},
	DeterminantPossessifJe: {
		description:
			"Le déterminant possessif à la 1ère personne précède un nom pour indiquer que celui-ci vous appartient (mon, ma...)",
		title: "Déterminant possessif (1ère personne)",
	},
	DeterminantPossessifTu: {
		description:
			"Le déterminant possessif à la 2e personne précède un nom pour indiquer que celui-ci appartient à la personne à qui l'on s'adresse familièrement (ton, ta...)",
		title: "Déterminant possessif (2e personne)",
	},
	FamilleAmi: {
		description: "Le terme utilisé pour désigner un·e ami·e (ami, amie...)",
		title: "Ami·e",
	},
	FamilleBelleFamille: {
		description:
			"Le terme utilisé pour désigner le conjoint ou la conjointe d'un enfant (gendre, bru...)",
		title: "Belle-famille",
	},
	FamilleCousin: {
		description:
			"Le terme utilisé pour désigner un·e cousin·e (cousin, cousine...)",
		title: "Cousin·e",
	},
	FamilleEnfant: {
		description: "Le terme utilisé pour désigner un enfant (fils, fille...)",
		title: "Enfant",
	},
	FamilleFratrie: {
		description:
			"Le terme utilisé pour désigner un lien de fratrie (frère, sœur...)",
		title: "Fratrie",
	},
	FamilleModificateur: {
		description:
			"Le préfixe utilisé pour désigner un cadet, un aîné ou un lien de parenté par alliance (petite-fille, grand-père, beau-frœur...)",
		title: "Modificateurs",
	},
	FamilleNeveu: {
		description:
			"Le terme utilisé pour désigner un neveu ou une nièce (neveu, nièce...)",
		title: "Neveu/Nièce",
	},
	FamilleOncle: {
		description:
			"Le terme utilisé pour désigner un oncle ou une tante (oncle, tante...)",
		title: "Oncle/Tante",
	},
	FamilleParent: {
		description: "Le terme utilisé pour désigner un parent (père, mère...)",
		title: "Parent",
	},
	FamilleParrain: {
		description:
			"Le terme utilisé pour désigner un parrain ou une marraine (parrain, marraine...)",
		title: "Parrain/Marraine",
	},
	FamillePartenaire: {
		description:
			"Le terme utilisé pour désigner un·e partenaire amoureux·se (partenaire, conjoint·e...)",
		title: "Partenaire",
	},
	PronomDemonstratif: {
		description:
			"Le pronom démonstratif remplace un nom déjà mentionné (celui, celle...)",
		title: "Pronom démonstratif",
	},
	PronomObjet: {
		description:
			"Le pronom objet (ou complément) remplace un nom après un verbe ou une préposition (lui, elle...)",
		title: "Pronom objet",
	},
	PronomPossessif: {
		description:
			"Le pronom possessif remplace un nom précédé d'un déterminant possessif (le sien, la sienne...)",
		title: "Pronom possessif (3e personne)",
	},
	PronomPossessifJe: {
		description:
			"Le pronom possessif à la 1ère personne remplace un nom précédé d'un déterminant possessif (le mien, la mienne...)",
		title: "Pronom possessif (1ère personne)",
	},
	PronomPossessifTu: {
		description:
			"Le pronom possessif à la 2e personne remplace un nom précédé d'un déterminant possessif, forme familière (le tien, la tienne...)",
		title: "Pronom possessif (2e personne)",
	},
	PronomSujet: {
		description: "Le pronom sujet remplace le sujet d'une phrase",
		title: "Pronom sujet",
	},
	TitreAdmin: {
		description:
			"Le titre de civilité utilisé pour s'adresser à la personne (Monsieur, Madame...)",
		title: "Titre",
	},
	TitreProfession: {
		description:
			"Le titre professionnel dont le suffixe varie selon le genre (directeur, directrice...)",
		title: "Métier",
	},
	Tout: {
		description:
			"Le déterminant, adjectif ou pronom indéfini exprimant la totalité (tout, toute...)",
		title: "Tout",
	},
};
