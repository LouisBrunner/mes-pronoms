import {util} from 'protobufjs/light'
import {emptyStorage, PronounsStorage} from 'logic/storage/types'
import {WireFormat} from 'logic/storage/format/types'
import {PronounList} from 'logic/types'
import {ensureChoice, parseChoice} from 'logic/business'
import {ConfigMessage} from './format.proto'
import Pbf from 'pbf'
import pako from 'pako'

// FIXME: mix-matching the proto libraries because neither are good

const compress = (store: PronounsStorage): string => {
  const pronouns = []
  for (const pronoun of PronounList) {
    const current = store.pronouns[pronoun]
    if (current === 'undefined') {
      continue
    }
    let content = {}
    if (typeof current === 'number') {
      content = {content: 'choice', choice: current}
    } else {
      content = {content: 'write_in', write_in: current}
    }
    pronouns.push(content)
  }

  const obj = {pronouns}
  const pbf = new Pbf()
  ConfigMessage.write(obj, pbf)
  const buffer = pako.deflate(pbf.finish())
  return encodeURIComponent(util.base64.encode(buffer, 0, buffer.length))
}

type ConfigObject = {
  pronouns: PronounObject[],
}

type PronounObject = {
  content: 'choice' | 'write_in',
  choice: number,
  write_in: string,
}

const decompress = (plain: string): PronounsStorage => {
  const bigBuffer = new Uint8Array(plain.length)
  const len = util.base64.decode(decodeURIComponent(plain), bigBuffer, 0)
  const buffer = pako.inflate(bigBuffer.subarray(0, len))
  const pbf = new Pbf(buffer)
  const obj = ConfigMessage.read(pbf) as ConfigObject
  if (obj.pronouns.length > PronounList.length) {
    throw new Error(`invalid number of pronouns '${obj.pronouns.length} vs ${PronounList.length}'`)
  }

  const store = emptyStorage()
  if (obj.pronouns === undefined) {
    console.error('invalid PB config message', obj)
    return store
  }
  for (let i = 0; i < obj.pronouns.length; ++i) {
    const pronoun = PronounList[i]
    const current = obj.pronouns[i]
    if (current.content === undefined) {
      console.error('invalid PB pronoun message', current)
      continue
    }
    if (current.content === 'choice') {
      // FIXME: toString silly??
      store.pronouns[pronoun] = parseChoice(pronoun, current.choice.toString())
    } else {
      store.pronouns[pronoun] = ensureChoice(pronoun, current.write_in)
    }
  }
  return store
}

export const PB_FORMAT: WireFormat = {
  prefix: 'p',
  compress,
  decompress,
}
