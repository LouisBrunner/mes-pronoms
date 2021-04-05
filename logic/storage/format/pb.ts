/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
import {util} from 'protobufjs/light'
import {emptyStorage, PronounsStorage} from 'logic/storage/types'
import {WireFormat} from 'logic/storage/format/types'
import {PronounList} from 'logic/types'
import {ensureChoice, parseChoice} from 'logic/business'
import protobuf from './format.proto'
import Pbf from 'pbf'
import pako from 'pako'

// FIXME: mix-matching the proto libraries because neither are good

const proto = {
  loaded: false,
  Pronoun: undefined,
  Config: undefined,
}
const loadDefinitions = (): void => {
  if (proto.loaded) {
    return
  }
  proto.Config = protobuf.ConfigMessage
  proto.Pronoun = protobuf.PronounMessage
  proto.loaded = true
}

const compress = (store: PronounsStorage): string => {
  loadDefinitions()

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
    for (let i = 0; i < 200; ++i) {
      if (i % 2 == 0) {
        pronouns.push({content: 'choice', choice: Math.round(Math.random() * 100)})
      } else {
        pronouns.push({content: 'write_in', choice: `${Math.random()}`.slice(0, 5)})
      }
    }
  }

  const obj = {pronouns}
  console.log(obj)
  const pbf = new Pbf()
  proto.Config.write(obj, pbf)
  const buf2 = pbf.finish()
  console.log(1, buf2, buf2.length)
  const buffer = pako.deflate(buf2)
  console.log(2, buffer, buffer.length)
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
  loadDefinitions()

  const bigBuffer = new Uint8Array(plain.length)
  const len = util.base64.decode(decodeURIComponent(plain), bigBuffer, 0)
  const buf2 = bigBuffer.subarray(0, len)
  console.log(3, buf2, buf2.length)
  const buffer = pako.inflate(bigBuffer.subarray(0, len))
  console.log(4, buffer, buffer.length)
  const pbf = new Pbf(buffer)
  const obj = proto.Config.read(pbf) as ConfigObject
  console.log(obj)
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
      // FIXME: silly??
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
