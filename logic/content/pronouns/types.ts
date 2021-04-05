export interface IPronounDBEntry {
  readonly id: number;
  readonly word: string;
  readonly ipa: string;
}
export type IPronounDB = IPronounDBEntry[]

export type IPronounChoice = Omit<IPronounDBEntry, 'id'>
export type IPronounsChoice = {
  lookup: Record<number, IPronounChoice>,
  db: IPronounDB,
}

export const convertDB = (db: IPronounDB): IPronounsChoice => {
  const choices: IPronounsChoice = {
    lookup: {},
    db,
  }
  for (const entry of db) {
    choices.lookup[entry.id] = entry
  }
  return choices
}
