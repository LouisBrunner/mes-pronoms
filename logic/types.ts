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

export interface IPronounStore {
  get(pronoun: PronounKind): PronounPick | undefined,
  set(pronoun: PronounKind, choice: PronounPick | undefined): void,

  export({compress}: {compress: boolean}): string,
}
