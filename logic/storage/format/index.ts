import {PB_FORMAT} from 'logic/storage/format/pb'
import {TEXT_FORMAT} from 'logic/storage/format/text'
import {LZ_FORMAT} from 'logic/storage/format/lz'
import {PronounsStorage} from 'logic/storage/types'

export {PB_FORMAT, TEXT_FORMAT, LZ_FORMAT}

export const WIRE_FORMATS = {
  [TEXT_FORMAT.prefix]: TEXT_FORMAT,
  [PB_FORMAT.prefix]: PB_FORMAT,
  [LZ_FORMAT.prefix]: LZ_FORMAT,
}

export const benchmarkFormats = (store: PronounsStorage): Record<string, string> => {
  const results: Record<string, string> = {}
  for (const prefix in WIRE_FORMATS) {
    results[prefix] = WIRE_FORMATS[prefix].compress(store)
  }
  return results
}
