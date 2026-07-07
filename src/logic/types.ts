export type PronounKind = "PronomSujet";
// TODO: complete later
// 'PronomObjet' |
// 'DeterminantPossessif' |
// 'PronomPossessif' |
// 'DeterminantDemonstratif' |
// 'PronomDemonstratif' |
// 'ArticleDefini' |
// 'ArticleIndefini' |
// 'ArticleIndefiniTout' |
// 'ArticlePartitif' |
// 'TitreFamille' |
// 'TitreTravail' |
// 'Accords'

// FIXME: not loving this...
export const PronounList: PronounKind[] = ["PronomSujet"];

export type PronounPick = number | string;

export type PronounChangeEventDetails =
	| {
			pronoun: PronounKind;
			choice: PronounPick | undefined;
	  }
	| Record<string, never>;
export type PronounChangeEvent = CustomEvent<PronounChangeEventDetails>;

export type ExportOptions = {
	compress: boolean;
};

export interface IPronounStore extends EventTarget {
	export({ compress }: ExportOptions): string;

	get(pronoun: PronounKind): PronounPick | undefined;
	init(data: string): void;
	set(pronoun: PronounKind, choice: PronounPick | undefined): void;

	shortForm(): string | undefined;
}
