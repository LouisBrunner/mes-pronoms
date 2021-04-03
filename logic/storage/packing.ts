import {TABLE} from 'logic/content/choices'
import {PronounList, PronounKind} from 'logic/types'
import {WIRE_FORMATS} from './format'
import {LZ_FORMAT, TEXT_FORMAT} from './format'
import {emptyStorage, PronounsStorage} from './types'

const HEADER_DELIM = '/'
const PRONOUN_DELIM = '/'

const ensureChoice = (pronoun: PronounKind, unescape: (s: string) => string, s: string): string | number => {
  const n = parseInt(s, 10)
  if (isNaN(n)) {
    return unescape(s)
  }
  const choice = TABLE.pronouns[pronoun]
  if (choice[n] === undefined) {
    throw new Error(`invalid choice '${n}' for ${pronoun}`)
  }
  return n
}

// FIXME: Binary packing should use protobuf or similar?
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
    store.pronouns[pronoun] = ensureChoice(pronoun, wformat.unescapeString, rawPick)
  }
  return store
}

export const packStore = (store: PronounsStorage, {compress}: {compress: boolean}): string => {
  const format = compress ? LZ_FORMAT : TEXT_FORMAT

  const list = []
  for (const p of PronounList) {
    let choice
    const pick = store.pronouns[p]
    if (pick === undefined) {
      choice = ''
    } else if (typeof pick === 'string') {
      choice = format.escapeString(pick)
    } else {
      choice = pick.toString(10)
    }
    list.push(choice)
  }

  const raw = list.join(PRONOUN_DELIM)
  return [format.prefix, format.compress(raw)].join(HEADER_DELIM)
}
