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
