import {compressToBase64, decompressFromBase64} from 'lz-string'
import {PronounsStorage} from 'logic/storage/types'
import {deserialize, serialize} from 'logic/storage/format/common'
import {identity} from 'logic/utils'
import {WireFormat} from 'logic/storage/format/types'

const compress = (store: PronounsStorage): string => {
  return compressToBase64(serialize(store, identity))
}

const decompress = (raw: string): PronounsStorage => {
  return deserialize(decompressFromBase64(raw), identity)
}

export const LZ_FORMAT: WireFormat = {
  prefix: 'z',
  compress,
  decompress,
}
