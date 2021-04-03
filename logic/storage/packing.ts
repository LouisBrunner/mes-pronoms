import {TABLE} from 'logic/content/choices'
import {SamePlural, LIST} from 'logic/types'
import {WIRE_FORMATS} from './format'
import {LZ_FORMAT, TEXT_FORMAT} from './format'
import {emptyStorage, PronounsStorage} from './types'

const HEADER_DELIM = '/'
const PRONOUN_DELIM = '/'
const PLURAL_SAME = '$'
const PLURAL_DELIM = '+'

const ensureChoice = (i: number, s: string, plural: boolean): string | number => {
  const n = parseInt(s, 10)
  if (isNaN(n)) {
    return s
  }
  const choice = TABLE.pronouns[LIST[i]][plural ? 'plural' : 'singular']
  if (n < 0 || choice.choices.length <= n) {
    throw new Error(`invalid choice '${n}' for ${i}:${plural ? 'p' : 's'}`)
  }
  return n
}

export const unpackStore = (raw: string): PronounsStorage => {
  const format = raw[0]
  const wformat = WIRE_FORMATS[format]
  if (wformat === undefined) {
    throw new Error(`unknown format '${format}'`)
  }
  if (raw[1] !== HEADER_DELIM) {
    throw new Error(`invalid header '${raw[1]} vs ${HEADER_DELIM}'`)
  }
  const plain = wformat.decompress(raw.slice(2))
  const parts = plain.split(PRONOUN_DELIM)
  if (parts.length > LIST.length) {
    throw new Error(`invalid number of pronouns '${parts.length} vs ${LIST.length}'`)
  }

  const store = emptyStorage()
  for (let i = 0; i < parts.length; ++i) {
    const rawPick = parts[i]
    if (rawPick === '') {
      continue
    }
    let choice
    if (rawPick[-1] === PLURAL_SAME) {
      choice = {
        singular: ensureChoice(i, rawPick.slice(0, -1), false),
        plural: SamePlural,
      }
    } else {
      const choiceParts = rawPick.split(PLURAL_DELIM)
      if (choiceParts.length > 2) {
        throw new Error(`invalid number of parts '${choiceParts.length} vs ${2}' for ${i}`)
      }
      choice = {
        singular: ensureChoice(i, choiceParts[0], false),
        plural: choiceParts.length > 1 ? ensureChoice(i, choiceParts[1], true) : undefined,
      }
    }
    store.pronouns[LIST[i]] = choice
  }
  return store
}

export const packStore = (store: PronounsStorage, {compress}: {compress: boolean}): string => {
  const format = compress ? LZ_FORMAT : TEXT_FORMAT

  const list = []
  for (const p of LIST) {
    let choice = ''
    const pick = store.pronouns[p]
    if (pick !== undefined) {
      choice = `${pick.singular}`
      if (pick.plural !== undefined) {
        if (pick.plural === SamePlural) {
          choice += PLURAL_SAME
        } else {
          choice += `${PLURAL_DELIM}${pick.plural}`
        }
      }
    }
    list.push(choice)
  }
  const raw = list.join(PRONOUN_DELIM)
  return `${format.prefix}${HEADER_DELIM}${format.compress(raw)}`
}
