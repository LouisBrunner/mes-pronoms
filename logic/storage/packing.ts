import {ExportOptions} from 'logic/types'
import {WIRE_FORMATS, LZ_FORMAT, TEXT_FORMAT} from 'logic/storage/format'
import {PronounsStorage} from 'logic/storage/types'

const HEADER_DELIM = '-'

export const isCompressed = (raw: string): boolean => {
  const format = raw[0]
  return WIRE_FORMATS[format] == LZ_FORMAT
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
  return wformat.decompress(raw.slice(2))
}

export const packStore = (store: PronounsStorage, {compress}: ExportOptions): string => {
  const format = compress ? LZ_FORMAT : TEXT_FORMAT
  return [format.prefix, format.compress(store)].join(HEADER_DELIM)
}
