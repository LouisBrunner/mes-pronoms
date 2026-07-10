/** biome-ignore-all lint/style/useNamingConvention: I want it */
import type { IPronounsChoice } from "@/logic/pronouns/_helpers.ts";
import { AccordsAdjectifsChoices } from "@/logic/pronouns/accordsAdjectifs.ts";
import { AccordsParticipeGroupe3Choices } from "@/logic/pronouns/accordsParticipeGroupe3.ts";
import { AccordsParticipeGroupe12Choices } from "@/logic/pronouns/accordsParticipeGroupe12.ts";
import { ArticleDefiniChoices } from "@/logic/pronouns/articleDefini.ts";
import { ArticleIndefiniChoices } from "@/logic/pronouns/articleIndefini.ts";
import { ArticlePartitifChoices } from "@/logic/pronouns/articlePartitif.ts";
import { DeterminantDemonstratifChoices } from "@/logic/pronouns/determinantDemonstratif.ts";
import { DeterminantPossessifChoices } from "@/logic/pronouns/determinantPossessif.ts";
import { DeterminantPossessifJeChoices } from "@/logic/pronouns/determinantPossessifJe.ts";
import { DeterminantPossessifTuChoices } from "@/logic/pronouns/determinantPossessifTu.ts";
import { FamilleAmiChoices } from "@/logic/pronouns/familleAmi.ts";
import { FamilleBelleFamilleChoices } from "@/logic/pronouns/familleBelleFamille.ts";
import { FamilleCousinChoices } from "@/logic/pronouns/familleCousin.ts";
import { FamilleEnfantChoices } from "@/logic/pronouns/familleEnfant.ts";
import { FamilleFratrieChoices } from "@/logic/pronouns/familleFratrie.ts";
import { FamilleModificateurChoices } from "@/logic/pronouns/familleModificateur.ts";
import { FamilleNeveuChoices } from "@/logic/pronouns/familleNeveu.ts";
import { FamilleOncleChoices } from "@/logic/pronouns/familleOncle.ts";
import { FamilleParentChoices } from "@/logic/pronouns/familleParent.ts";
import { FamilleParrainChoices } from "@/logic/pronouns/familleParrain.ts";
import { FamillePartenaireChoices } from "@/logic/pronouns/famillePartenaire.ts";
import { PronomDemonstratifChoices } from "@/logic/pronouns/pronomDemonstratif.ts";
import { PronomObjetChoices } from "@/logic/pronouns/pronomObjet.ts";
import { PronomPossessifChoices } from "@/logic/pronouns/pronomPossessif.ts";
import { PronomPossessifJeChoices } from "@/logic/pronouns/pronomPossessifJe.ts";
import { PronomPossessifTuChoices } from "@/logic/pronouns/pronomPossessifTu.ts";
import { PronomSujetChoices } from "@/logic/pronouns/pronomSujet.ts";
import { TitreProfessionChoices } from "@/logic/pronouns/titreProfession.ts";
import { TitreAdminChoices } from "@/logic/pronouns/titreTravail.ts";
import { ToutChoices } from "@/logic/pronouns/tout.ts";

export interface PronounCategory {
	readonly pronouns: PronounKind[];
	readonly title: string;
}

export type PronounKind =
	| "PronomSujet"
	| "PronomObjet"
	| "PronomDemonstratif"
	| "DeterminantPossessifJe"
	| "DeterminantPossessifTu"
	| "DeterminantPossessif"
	| "PronomPossessifJe"
	| "PronomPossessifTu"
	| "PronomPossessif"
	| "DeterminantDemonstratif"
	| "ArticleDefini"
	| "ArticleIndefini"
	| "ArticlePartitif"
	| "Tout"
	| "TitreAdmin"
	| "TitreProfession"
	| "FamilleParent"
	| "FamilleFratrie"
	| "FamilleEnfant"
	| "FamilleOncle"
	| "FamilleNeveu"
	| "FamilleCousin"
	| "FamillePartenaire"
	| "FamilleAmi"
	| "FamilleParrain"
	| "FamilleBelleFamille"
	| "FamilleModificateur"
	| "AccordsAdjectifs"
	| "AccordsParticipeGroupe12"
	| "AccordsParticipeGroupe3";

export const PronounsList: PronounKind[] = [
	"PronomSujet",
	"PronomObjet",
	"PronomDemonstratif",
	"DeterminantPossessifJe",
	"DeterminantPossessifTu",
	"DeterminantPossessif",
	"PronomPossessifJe",
	"PronomPossessifTu",
	"PronomPossessif",
	"DeterminantDemonstratif",
	"ArticleDefini",
	"ArticleIndefini",
	"ArticlePartitif",
	"Tout",
	"TitreAdmin",
	"TitreProfession",
	"FamilleParent",
	"FamilleFratrie",
	"FamilleEnfant",
	"FamilleOncle",
	"FamilleNeveu",
	"FamilleCousin",
	"FamillePartenaire",
	"FamilleAmi",
	"FamilleParrain",
	"FamilleBelleFamille",
	"FamilleModificateur",
	"AccordsAdjectifs",
	"AccordsParticipeGroupe12",
	"AccordsParticipeGroupe3",
];

export const PronounCategoryFamily: PronounKind[] = [
	"FamilleParent",
	"FamilleFratrie",
	"FamilleEnfant",
	"FamilleOncle",
	"FamilleNeveu",
	"FamilleCousin",
	"FamillePartenaire",
	"FamilleAmi",
	"FamilleParrain",
	"FamilleBelleFamille",
	"FamilleModificateur",
];

export const PronounCategories: PronounCategory[] = [
	{
		pronouns: [
			"PronomSujet",
			"PronomObjet",
			"PronomDemonstratif",
			"PronomPossessifJe",
			"PronomPossessifTu",
			"PronomPossessif",
		],
		title: "Pronoms",
	},
	{
		pronouns: [
			"DeterminantPossessifJe",
			"DeterminantPossessifTu",
			"DeterminantPossessif",
			"DeterminantDemonstratif",
		],
		title: "Déterminants",
	},
	{
		pronouns: ["ArticleDefini", "ArticleIndefini", "ArticlePartitif", "Tout"],
		title: "Articles",
	},
	{
		pronouns: ["TitreAdmin", "TitreProfession"],
		title: "Titres",
	},
	{
		pronouns: PronounCategoryFamily,
		title: "Famille",
	},
	{
		pronouns: [
			"AccordsAdjectifs",
			"AccordsParticipeGroupe12",
			"AccordsParticipeGroupe3",
		],
		title: "Accords",
	},
];

export type IPronounTable = Record<PronounKind, IPronounsChoice>;

export const PRONOUNS: IPronounTable = {
	AccordsAdjectifs: AccordsAdjectifsChoices,
	AccordsParticipeGroupe3: AccordsParticipeGroupe3Choices,
	AccordsParticipeGroupe12: AccordsParticipeGroupe12Choices,
	ArticleDefini: ArticleDefiniChoices,
	ArticleIndefini: ArticleIndefiniChoices,
	ArticlePartitif: ArticlePartitifChoices,
	DeterminantDemonstratif: DeterminantDemonstratifChoices,
	DeterminantPossessif: DeterminantPossessifChoices,
	DeterminantPossessifJe: DeterminantPossessifJeChoices,
	DeterminantPossessifTu: DeterminantPossessifTuChoices,
	FamilleAmi: FamilleAmiChoices,
	FamilleBelleFamille: FamilleBelleFamilleChoices,
	FamilleCousin: FamilleCousinChoices,
	FamilleEnfant: FamilleEnfantChoices,
	FamilleFratrie: FamilleFratrieChoices,
	FamilleModificateur: FamilleModificateurChoices,
	FamilleNeveu: FamilleNeveuChoices,
	FamilleOncle: FamilleOncleChoices,
	FamilleParent: FamilleParentChoices,
	FamilleParrain: FamilleParrainChoices,
	FamillePartenaire: FamillePartenaireChoices,
	PronomDemonstratif: PronomDemonstratifChoices,
	PronomObjet: PronomObjetChoices,
	PronomPossessif: PronomPossessifChoices,
	PronomPossessifJe: PronomPossessifJeChoices,
	PronomPossessifTu: PronomPossessifTuChoices,
	PronomSujet: PronomSujetChoices,
	TitreAdmin: TitreAdminChoices,
	TitreProfession: TitreProfessionChoices,
	Tout: ToutChoices,
};

export const PronounList: PronounKind[] = PronounCategories.flatMap(
	(category) => category.pronouns,
);
