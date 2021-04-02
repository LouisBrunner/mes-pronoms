export enum Pronouns {
  PronomSujet,
  PronomObjet,
  DeterminantPossessif,
  PronomPossessif,
  DeterminantDemonstratif,
  PronomDemonstratif,
  ArticleDefini,
  ArticleIndefini,
  ArticleIndefiniTout,
  ArticlePartitif,
  TitreFamille,
  TitreTravail,
  Accords,
}

export const PronounList = ((): Pronouns[] => {
  const result = []
  for (const p in Pronouns) {
    if (isNaN(Number(p))) {
      result.push(Pronouns[p] as unknown as Pronouns)
    }
  }
  return result
})()

export interface IPronounChoice {
  readonly choices: string[]
  readonly writeIn: boolean
}

export interface IPronounChoices {
  readonly singular: IPronounChoice
  readonly plural: IPronounChoice | string
}

export interface IPronounText {
  readonly title: string
  readonly description: string
  readonly examples: {
    singularWith(pronoun: string): string;
    pluralWith(pronoun: string): string;
  }
}

export interface IPronounsManager {
  getPronoun(pronoun: Pronouns, singular: boolean): number | string | undefined,
  setPronoun(pronoun: Pronouns, singular: boolean, choice: number | string): void,

  export(): string,
}
