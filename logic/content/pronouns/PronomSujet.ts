import {convertDB, IPronounDB} from 'logic/content/pronouns/types'

export const PronomSujetDB: IPronounDB = [
  {id: 0, word: 'iel', ipa: 'jɛl'},
  {id: 1, word: 'yel', ipa: 'jɛl'},
  {id: 2, word: 'il', ipa: 'il'},
  {id: 3, word: 'elle', ipa: 'ɛl'},
  {id: 4, word: 'ille', ipa: 'il'},
  {id: 5, word: 'ul', ipa: 'yl'},
  {id: 6, word: 'ol', ipa: 'ol'},
  {id: 7, word: 'yol', ipa: 'jol'},
  {id: 8, word: 'æl', ipa: 'aɛl'},
  {id: 9, word: 'im', ipa: 'im'},
  {id: 10, word: 'em', ipa: 'ɛm'},
  {id: 11, word: 'el', ipa: 'ɛl'},
  {id: 12, word: 'al', ipa: 'al'},
  {id: 13, word: 'ælle', ipa: 'aɛl'},
]

export const PronomSujetChoices = convertDB(PronomSujetDB)
