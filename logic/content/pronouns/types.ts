export interface IPronounDBEntry {
  readonly id: number;
  readonly word: string;
  readonly ipa: string;
}
export type IPronounDB = IPronounDBEntry[]

export type IPronounChoice = Omit<IPronounDBEntry, 'id'>
export type IPronounsChoice = Record<number, IPronounChoice>

export const convertDB = (db: IPronounDB): IPronounsChoice => {
  const choices: IPronounsChoice = {}
  for (const entry of db) {
    choices[entry.id] = entry
  }
  return choices
}
