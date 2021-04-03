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
export const LIST: PronounKind[] = [
  'PronomSujet',
]

type SamePluralT = 'SAME_PRONOUN'
export const SamePlural: SamePluralT = 'SAME_PRONOUN'
export type PronounPick = number | string | typeof SamePlural | undefined

export interface IPronounStore {
  get(pronoun: PronounKind, singular: boolean): PronounPick,
  set(pronoun: PronounKind, singular: boolean, choice: PronounPick): void,
  export({compress}: {compress: boolean}): string,
}
