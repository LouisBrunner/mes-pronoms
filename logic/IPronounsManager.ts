export enum Pronouns {
  PronomSujet,
}

export interface IPronounsManager {
  getPronoun(pronoun: Pronouns): string | null,
  setPronoun(pronoun: Pronouns, choice: string): void,
  getPronounChoices(pronoun: Pronouns): string[],

  export(): string,
}
