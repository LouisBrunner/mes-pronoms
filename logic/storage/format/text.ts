import {PronounsStorage} from 'logic/storage/types'
import {deserialize, serialize} from 'logic/storage/format/common'
import {WireFormat} from 'logic/storage/format/types'

const compress = (store: PronounsStorage): string => {
  return serialize(store, encodeURIComponent)
}

const decompress = (raw: string): PronounsStorage => {
  return deserialize(raw, decodeURIComponent)
}

export const TEXT_FORMAT: WireFormat = {
  prefix: 't',
  compress,
  decompress,
}
