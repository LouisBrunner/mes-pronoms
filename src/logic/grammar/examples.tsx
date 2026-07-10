/** biome-ignore-all lint/style/useComponentExportOnlyModules: nope */
/** biome-ignore-all lint/style/useNamingConvention: I want it */
import type { ReactNode } from "react";
import {
	getForms,
	mustEllide,
	resolvePronouns,
} from "@/logic/grammar/helpers.ts";
import {
	PronounCategoryFamily,
	type PronounKind,
} from "@/logic/pronouns/index.ts";
import type { PronounSelections } from "@/logic/storage/store.ts";
import { capitalize } from "@/logic/utils.ts";

const Highlight = ({ children }: { children: ReactNode }) => (
	<mark className="rounded bg-primary/15 px-1 font-semibold text-primary">
		{children}
	</mark>
);

const SoftHighlight = ({ children }: { children: ReactNode }) => (
	<mark className="rounded bg-muted-foreground/10 px-1 text-muted-foreground">
		{children}
	</mark>
);

const prepareArticle = (word: string, article: string): [string, string] => {
	const elides = mustEllide(word);
	const displayArticle = elides ? "l'" : article;
	const sep = elides ? "" : " ";
	return [displayArticle, sep];
};

type Example = {
	key: string;
	plural?: boolean;
	text: ReactNode;
};

const renderExamples = (list: Example[]): ReactNode => (
	<ul className="list-inside list-disc ps-2">
		{list.map(({ key, plural, text }) => (
			<li key={key}>
				<em>{plural ? "Pluriel" : "Singulier"}</em>: {text}
			</li>
		))}
	</ul>
);

export type ExamplesProps = {
	kind: PronounKind;
	word: string | string[];
	selections: PronounSelections;
};

export const Examples = ({ kind, word, selections }: ExamplesProps) => {
	const [singular, plural] = getForms(kind, word);

	if (kind === "FamilleModificateur") {
		return renderModifierExamples(singular, plural, selections);
	}
	if (PronounCategoryFamily.includes(kind)) {
		return renderFamilyExamples(singular, plural, selections);
	}

	return EXAMPLES[kind](singular, plural, selections);
};

type ExampleFn = (
	singular: string,
	plural: string,
	selections: PronounSelections,
) => ReactNode;

type IPronounExamples = Record<PronounKind, ExampleFn>;

const handledSeparately = () => {
	throw new Error(
		"This pronoun is handled separately in the Examples component.",
	);
};

const EXAMPLES: IPronounExamples = {
	AccordsAdjectifs: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [sujet, pluralSujet] = resolvePronouns("PronomSujet", selections);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						<SoftHighlight>{capitalize(sujet)}</SoftHighlight> est{" "}
						<Highlight>{word}</Highlight> d'être ici.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<SoftHighlight>{capitalize(pluralSujet)}</SoftHighlight> sont{" "}
						<Highlight>{pluralWord}</Highlight> d'être ici.
					</>
				),
			},
		]);
	},
	AccordsParticipeGroupe3: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [sujet, pluralSujet] = resolvePronouns("PronomSujet", selections);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						<SoftHighlight>{capitalize(sujet)}</SoftHighlight> est{" "}
						<Highlight>{word}</Highlight> au travail ce matin.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<SoftHighlight>{capitalize(pluralSujet)}</SoftHighlight> sont{" "}
						<Highlight>{pluralWord}</Highlight> au travail ce matin.
					</>
				),
			},
		]);
	},
	AccordsParticipeGroupe12: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [sujet, pluralSujet] = resolvePronouns("PronomSujet", selections);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						<SoftHighlight>{capitalize(sujet)}</SoftHighlight> est{" "}
						<Highlight>{word}</Highlight> au travail ce matin.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<SoftHighlight>{capitalize(pluralSujet)}</SoftHighlight> sont{" "}
						<Highlight>{pluralWord}</Highlight> au travail ce matin.
					</>
				),
			},
		]);
	},
	ArticleDefini: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [amix] = resolvePronouns("FamilleAmi", selections);
		const [displayArticle, sep] = prepareArticle(amix, word);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						<Highlight>{capitalize(word)}</Highlight> collègue de Sacha vient
						d'arriver.
					</>
				),
			},
			{
				key: "sg2",
				text: (
					<>
						<Highlight>{capitalize(displayArticle)}</Highlight>
						{sep}
						<SoftHighlight>{amix}</SoftHighlight> de Sacha vient d'arriver.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<Highlight>{capitalize(pluralWord)}</Highlight> collègues de Sacha
						viennent d'arriver.
					</>
				),
			},
		]);
	},
	ArticleIndefini: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [amix] = resolvePronouns("FamilleAmi", selections);
		const [participe] = resolvePronouns("AccordsParticipeGroupe12", selections);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						<Highlight>{capitalize(word)}</Highlight>{" "}
						<SoftHighlight>{amix}</SoftHighlight> est{" "}
						<SoftHighlight>{participe}</SoftHighlight> à la plage avec moi.
					</>
				),
			},
			{
				key: "sg2",
				text: (
					<>
						C'est <Highlight>{word}</Highlight> collègue formidable.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						Ce sont <Highlight>{pluralWord}</Highlight> collègues formidables.
					</>
				),
			},
		]);
	},
	ArticlePartitif: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [title, titles] = resolvePronouns("TitreProfession", selections);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						Va au bureau <Highlight>{word}</Highlight>{" "}
						<SoftHighlight>{title}</SoftHighlight> !
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						On a parlé <Highlight>{pluralWord}</Highlight>{" "}
						<SoftHighlight>{titles}</SoftHighlight> toute la soirée.
					</>
				),
			},
		]);
	},
	DeterminantDemonstratif: (word: string, pluralWord: string): ReactNode =>
		renderExamples([
			{
				key: "sg1",
				text: (
					<>
						J'ai apprécié travailler avec <Highlight>{word}</Highlight>{" "}
						collègue.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<Highlight>{capitalize(pluralWord)}</Highlight> personnes
						m'accompagnent partout.
					</>
				),
			},
		]),
	DeterminantPossessif: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [, amixs] = resolvePronouns("FamilleAmi", selections);
		const [, pluralParticipe] = resolvePronouns(
			"AccordsParticipeGroupe12",
			selections,
		);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						Alex a présenté <Highlight>{word}</Highlight> collègue à la réunion.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<Highlight>{capitalize(pluralWord)}</Highlight>{" "}
						<SoftHighlight>{amixs}</SoftHighlight> y sont{" "}
						<SoftHighlight>{pluralParticipe}</SoftHighlight> ensemble.
					</>
				),
			},
		]);
	},
	DeterminantPossessifJe: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [, amixs] = resolvePronouns("FamilleAmi", selections);
		const [, pluralParticipe] = resolvePronouns(
			"AccordsParticipeGroupe12",
			selections,
		);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						J'ai présenté <Highlight>{word}</Highlight> collègue à la réunion.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<Highlight>{capitalize(pluralWord)}</Highlight>{" "}
						<SoftHighlight>{amixs}</SoftHighlight> y sont{" "}
						<SoftHighlight>{pluralParticipe}</SoftHighlight> ensemble.
					</>
				),
			},
		]);
	},
	DeterminantPossessifTu: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [, amixs] = resolvePronouns("FamilleAmi", selections);
		const [, pluralParticipe] = resolvePronouns(
			"AccordsParticipeGroupe12",
			selections,
		);
		const [, pluralSujet] = resolvePronouns("PronomSujet", selections);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						As-tu présenté <Highlight>{word}</Highlight> collègue à la réunion ?
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<Highlight>{capitalize(pluralWord)}</Highlight>{" "}
						<SoftHighlight>{amixs}</SoftHighlight> y sont-
						<SoftHighlight>{pluralSujet}</SoftHighlight>{" "}
						<SoftHighlight>{pluralParticipe}</SoftHighlight> ensemble ?
					</>
				),
			},
		]);
	},
	FamilleAmi: handledSeparately,
	FamilleBelleFamille: handledSeparately,
	FamilleCousin: handledSeparately,
	FamilleEnfant: handledSeparately,
	FamilleFratrie: handledSeparately,
	FamilleModificateur: handledSeparately,
	FamilleNeveu: handledSeparately,
	FamilleOncle: handledSeparately,
	FamilleParent: handledSeparately,
	FamilleParrain: handledSeparately,
	FamillePartenaire: handledSeparately,
	PronomDemonstratif: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [, tous] = resolvePronouns("Tout", selections);
		const [, adjectives] = resolvePronouns("AccordsAdjectifs", selections);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						Je m'adresse à <Highlight>{word}</Highlight> qui représente le
						groupe.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						Je m'adresse à <SoftHighlight>{tous}</SoftHighlight>{" "}
						<Highlight>{pluralWord}</Highlight> qui sont{" "}
						<SoftHighlight>{adjectives}</SoftHighlight>.
					</>
				),
			},
		]);
	},
	PronomObjet: (word: string, pluralWord: string): ReactNode =>
		renderExamples([
			{
				key: "sg1",
				text: (
					<>
						Je pense à <Highlight>{word}</Highlight> tous les jours.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						Je pense à <Highlight>{pluralWord}</Highlight> tous les soirs.
					</>
				),
			},
		]),
	PronomPossessif: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [l, ls] = resolvePronouns("ArticleDefini", selections);
		const [determinantJe] = resolvePronouns(
			"DeterminantPossessifJe",
			selections,
		);
		const [_, pluralPronomJe] = resolvePronouns(
			"PronomPossessifJe",
			selections,
		);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						Ce n'est pas <SoftHighlight>{determinantJe}</SoftHighlight>{" "}
						collègue, c'est <SoftHighlight>{l}</SoftHighlight>{" "}
						<Highlight>{word}</Highlight>.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						Ce ne sont pas <SoftHighlight>{ls}</SoftHighlight>{" "}
						<SoftHighlight>{pluralPronomJe}</SoftHighlight>, ce sont{" "}
						<SoftHighlight>{ls}</SoftHighlight>{" "}
						<Highlight>{pluralWord}</Highlight>.
					</>
				),
			},
		]);
	},
	PronomPossessifJe: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [l, ls] = resolvePronouns("ArticleDefini", selections);
		const [determinantTu] = resolvePronouns(
			"DeterminantPossessifTu",
			selections,
		);
		const [_, pluralPronomTu] = resolvePronouns(
			"PronomPossessifTu",
			selections,
		);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						Ce n'est pas <SoftHighlight>{determinantTu}</SoftHighlight>{" "}
						collègue, c'est <SoftHighlight>{l}</SoftHighlight>{" "}
						<Highlight>{word}</Highlight>.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						Ce ne sont pas <SoftHighlight>{ls}</SoftHighlight>{" "}
						<SoftHighlight>{pluralPronomTu}</SoftHighlight>, ce sont{" "}
						<SoftHighlight>{ls}</SoftHighlight>{" "}
						<Highlight>{pluralWord}</Highlight>.
					</>
				),
			},
		]);
	},
	PronomPossessifTu: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [l, ls] = resolvePronouns("ArticleDefini", selections);
		const [determinantJe] = resolvePronouns(
			"DeterminantPossessifJe",
			selections,
		);
		const [_, pluralPronomJe] = resolvePronouns(
			"PronomPossessifJe",
			selections,
		);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						Ce n'est pas <SoftHighlight>{determinantJe}</SoftHighlight>{" "}
						collègue, c'est <SoftHighlight>{l}</SoftHighlight>{" "}
						<Highlight>{word}</Highlight>.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						Ce ne sont <SoftHighlight>{ls}</SoftHighlight>{" "}
						<SoftHighlight>{pluralPronomJe}</SoftHighlight>, ce sont{" "}
						<SoftHighlight>{ls}</SoftHighlight>{" "}
						<Highlight>{pluralWord}</Highlight>.
					</>
				),
			},
		]);
	},
	PronomSujet: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [_, pluralParticipe] = resolvePronouns(
			"AccordsParticipeGroupe12",
			selections,
		);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						<Highlight>{capitalize(word)}</Highlight> aime bien l'anglais.
					</>
				),
			},
			{
				key: "sg2",
				text: (
					<>
						<Highlight>{capitalize(word)}</Highlight> a préparé le repas ce
						soir.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<Highlight>{capitalize(pluralWord)}</Highlight> partent en vacances
						en Catalogne.
					</>
				),
			},
			{
				key: "pl2",
				plural: true,
				text: (
					<>
						<Highlight>{capitalize(pluralWord)}</Highlight> sont{" "}
						<SoftHighlight>{pluralParticipe}</SoftHighlight> voir Sam.
					</>
				),
			},
		]);
	},
	TitreAdmin: (word: string, pluralWord: string): ReactNode =>
		renderExamples([
			{
				key: "sg1",
				text: (
					<>
						Bonjour <Highlight>{word}</Highlight> Dupont, comment allez-vous ?
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						Bonjour <Highlight>{pluralWord}</Highlight>, comment allez-vous ?
					</>
				),
			},
		]),
	TitreProfession: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [l, ls] = resolvePronouns("ArticleDefini", selections);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						<SoftHighlight>{capitalize(l)}</SoftHighlight>{" "}
						<Highlight>{word}</Highlight> du service a validé le projet.
					</>
				),
			},
			{
				key: "sg2",
				text: (
					<>
						On a nommé Sacha <Highlight>{word}</Highlight> de l'équipe.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<SoftHighlight>{capitalize(ls)}</SoftHighlight>{" "}
						<Highlight>{pluralWord}</Highlight> du service ont validé le projet.
					</>
				),
			},
		]);
	},
	Tout: (
		word: string,
		pluralWord: string,
		selections: PronounSelections,
	): ReactNode => {
		const [sujet] = resolvePronouns("PronomSujet", selections);
		const [adjectif] = resolvePronouns("AccordsAdjectifs", selections);
		const [_, demonstratifPlural] = resolvePronouns(
			"PronomDemonstratif",
			selections,
		);
		return renderExamples([
			{
				key: "sg1",
				text: (
					<>
						<SoftHighlight>{capitalize(sujet)}</SoftHighlight> est{" "}
						<Highlight>{word}</Highlight>{" "}
						<SoftHighlight>{adjectif}</SoftHighlight> de cette nouvelle.
					</>
				),
			},
			{
				key: "pl1",
				plural: true,
				text: (
					<>
						<Highlight>{capitalize(pluralWord)}</Highlight>{" "}
						<SoftHighlight>{demonstratifPlural}</SoftHighlight> qui étaient là
						ont pu parler.
					</>
				),
			},
		]);
	},
};

const renderFamilyExamples = (
	word: string,
	pluralWord: string,
	selections: PronounSelections,
): ReactNode => {
	const [l, ls] = resolvePronouns("ArticleDefini", selections);
	const [displayArticle, sep] = prepareArticle(word, l);
	return renderExamples([
		{
			key: "sg1",
			text: (
				<>
					Alex est <SoftHighlight>{displayArticle}</SoftHighlight>
					{sep}
					<Highlight>{word}</Highlight> de Sam.
				</>
			),
		},
		{
			key: "pl1",
			plural: true,
			text: (
				<>
					<SoftHighlight>{capitalize(ls)}</SoftHighlight>{" "}
					<Highlight>{pluralWord}</Highlight> de Camille viennent nous rendre
					visite.
				</>
			),
		},
	]);
};

const renderModifierExamples = (
	word: string,
	plural: string,
	selections: PronounSelections,
): ReactNode => {
	const [petite, grand, beau] = word.split("/") as [string, string, string];
	const [petits, grands, belles] = plural.split("/") as [
		string,
		string,
		string,
	];
	const [l, ls] = resolvePronouns("ArticleDefini", selections);
	const [enfant, enfants] = resolvePronouns("FamilleEnfant", selections);
	const [parent, parents] = resolvePronouns("FamilleParent", selections);
	const [sib, sibs] = resolvePronouns("FamilleFratrie", selections);
	const [couz, couzs] = resolvePronouns("FamilleCousin", selections);
	const [nepo, nepos] = resolvePronouns("FamilleNeveu", selections);
	return renderExamples([
		{
			key: "sg-petite-fi",
			text: (
				<>
					Alex est <SoftHighlight>{l}</SoftHighlight>{" "}
					<Highlight>{petite}</Highlight>-
					<SoftHighlight>{enfant}</SoftHighlight> de Sam.
				</>
			),
		},
		{
			key: "sg-petite-couz",
			text: (
				<>
					Alex est <SoftHighlight>{l}</SoftHighlight>{" "}
					<Highlight>{petite}</Highlight>-<SoftHighlight>{couz}</SoftHighlight>{" "}
					de Sam.
				</>
			),
		},
		{
			key: "sg-petite-nepo",
			text: (
				<>
					Alex est <SoftHighlight>{l}</SoftHighlight>{" "}
					<Highlight>{petite}</Highlight>-<SoftHighlight>{nepo}</SoftHighlight>{" "}
					de Sam.
				</>
			),
		},
		{
			key: "sg-grand-pa",
			text: (
				<>
					Alex est <SoftHighlight>{l}</SoftHighlight>{" "}
					<Highlight>{grand}</Highlight>-<SoftHighlight>{parent}</SoftHighlight>{" "}
					de Sam.
				</>
			),
		},
		{
			key: "sg-beau-parent",
			text: (
				<>
					Alex est <SoftHighlight>{l}</SoftHighlight>{" "}
					<Highlight>{beau}</Highlight>-<SoftHighlight>{parent}</SoftHighlight>{" "}
					de Sam.
				</>
			),
		},
		{
			key: "sg-beau-enfant",
			text: (
				<>
					Alex est <SoftHighlight>{l}</SoftHighlight>{" "}
					<Highlight>{beau}</Highlight>-<SoftHighlight>{enfant}</SoftHighlight>{" "}
					de Sam.
				</>
			),
		},
		{
			key: "sg-beau-sib",
			text: (
				<>
					Alex est <SoftHighlight>{l}</SoftHighlight>{" "}
					<Highlight>{beau}</Highlight>-<SoftHighlight>{sib}</SoftHighlight> de
					Sam.
				</>
			),
		},
		{
			key: "pl-petits-fis",
			plural: true,
			text: (
				<>
					<SoftHighlight>{capitalize(ls)}</SoftHighlight>{" "}
					<Highlight>{petits}</Highlight>-
					<SoftHighlight>{enfants}</SoftHighlight> de Camille viennent nous
					rendre visite.
				</>
			),
		},
		{
			key: "pl-petits-couz",
			plural: true,
			text: (
				<>
					<SoftHighlight>{capitalize(ls)}</SoftHighlight>{" "}
					<Highlight>{petits}</Highlight>-<SoftHighlight>{couzs}</SoftHighlight>{" "}
					de Camille viennent nous rendre visite.
				</>
			),
		},
		{
			key: "pl-petits-nepos",
			plural: true,
			text: (
				<>
					<SoftHighlight>{capitalize(ls)}</SoftHighlight>{" "}
					<Highlight>{petits}</Highlight>-<SoftHighlight>{nepos}</SoftHighlight>{" "}
					de Camille viennent nous rendre visite.
				</>
			),
		},
		{
			key: "pl-grands-mas",
			plural: true,
			text: (
				<>
					<SoftHighlight>{capitalize(ls)}</SoftHighlight>{" "}
					<Highlight>{grands}</Highlight>-
					<SoftHighlight>{parents}</SoftHighlight> de Camille viennent nous
					rendre visite.
				</>
			),
		},
		{
			key: "pl-belles-parents",
			plural: true,
			text: (
				<>
					<SoftHighlight>{capitalize(ls)}</SoftHighlight>{" "}
					<Highlight>{belles}</Highlight>-
					<SoftHighlight>{parents}</SoftHighlight> de Camille viennent nous
					rendre visite.
				</>
			),
		},
		{
			key: "pl-belles-enfants",
			plural: true,
			text: (
				<>
					<SoftHighlight>{capitalize(ls)}</SoftHighlight>{" "}
					<Highlight>{belles}</Highlight>-
					<SoftHighlight>{enfants}</SoftHighlight> de Camille viennent nous
					rendre visite.
				</>
			),
		},
		{
			key: "pl-belles-sibs",
			plural: true,
			text: (
				<>
					<SoftHighlight>{capitalize(ls)}</SoftHighlight>{" "}
					<Highlight>{belles}</Highlight>-<SoftHighlight>{sibs}</SoftHighlight>{" "}
					de Camille viennent nous rendre visite.
				</>
			),
		},
	]);
};
