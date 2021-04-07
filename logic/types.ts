import EventTarget from '@ungap/event-target'

export type PronounKind =
  'PronomSujet'
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
export const PronounList: PronounKind[] = [
  'PronomSujet',
]

export type PronounPick = number | string

export type PronounChangeEventDetails = {
  pronoun: PronounKind,
  choice: PronounPick | undefined,
} | Record<string, never>
export type PronounChangeEvent = CustomEvent<PronounChangeEventDetails>

export type ExportOptions = {
  compress: boolean,
}

export interface IPronounStore extends EventTarget {
  init(data: string): void,

  get(pronoun: PronounKind): PronounPick | undefined,
  set(pronoun: PronounKind, choice: PronounPick | undefined): void,

  shortForm(): string,

  export({compress}: ExportOptions): string,
}
