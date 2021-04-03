export interface IPronounDBEntry {
  readonly id: number;
  readonly word: string;
  readonly ipa: string;
}

export type IPronounDB = IPronounDBEntry[]

export type IPronounsChoice = Record<number, IPronounDBEntry>

export const convertDB = (db: IPronounDB): IPronounsChoice => {
  const choices: IPronounsChoice = {}
  for (const entry of db) {
    choices[entry.id] = entry
  }
  return choices
}
