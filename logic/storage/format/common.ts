import {PronounList} from 'logic/types'
import {emptyStorage, PronounsStorage} from 'logic/storage/types'
import {parseChoice} from 'logic/business'

const PRONOUN_DELIM = ','

export const serialize = (store: PronounsStorage, escapeString: (s: string) => string): string => {
  const list = []
  for (const p of PronounList) {
    let choice
    const pick = store.pronouns[p]
    if (pick === undefined) {
      choice = ''
    } else if (typeof pick === 'string') {
      choice = escapeString(pick)
    } else {
      choice = pick.toString(10)
    }
    list.push(choice)
  }
  return list.join(PRONOUN_DELIM)
}

export const deserialize = (plain: string, unescapeString: (s: string) => string): PronounsStorage => {
  const parts = plain.split(PRONOUN_DELIM)
  if (parts.length > PronounList.length) {
    throw new Error(`invalid number of pronouns '${parts.length} vs ${PronounList.length}'`)
  }

  const store = emptyStorage()
  for (let i = 0; i < parts.length; ++i) {
    const pronoun = PronounList[i]
    const rawPick = parts[i]
    if (rawPick === '') {
      continue
    }
    let choice = parseChoice(pronoun, rawPick)
    if (typeof choice === 'string') {
      choice = unescapeString(choice)
    }
    store.pronouns[pronoun] = choice
  }
  return store
}
