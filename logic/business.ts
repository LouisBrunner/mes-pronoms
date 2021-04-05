import {TABLE} from 'logic/content/choices'
import {GRAMMAR, IPronounContent} from 'logic/content/grammar'
import {PronounKind, PronounPick} from 'logic/types'

export interface ChosenPronoun {
  readonly word: string;
  readonly ipa?: string;
}

export const choosePronoun = (pronoun: PronounKind, picked: PronounPick): ChosenPronoun | undefined => {
  if (picked === undefined) {
    return undefined
  }
  if (typeof picked === 'string') {
    return {word: picked}
  }
  return TABLE.pronouns[pronoun].lookup[picked]
}

export const fetchGrammar = (pronoun: PronounKind): IPronounContent => {
  return GRAMMAR.pronouns[pronoun]
}

export const parseChoice = (pronoun: PronounKind, s: string): string | number => {
  const n = parseInt(s, 10)
  if (isNaN(n)) {
    return unescape(s)
  }
  const choice = TABLE.pronouns[pronoun].lookup
  if (choice[n] === undefined) {
    throw new Error(`invalid choice '${n}' for ${pronoun}`)
  }
  return n
}

export const ensureChoice = (pronoun: PronounKind, s: string): string | number => {
  for (const entry of TABLE.pronouns[pronoun].db) {
    if (entry.word === s) {
      return entry.id
    }
  }
  return s
}
