import {PronounsStorage} from 'logic/storage/types'

export interface WireFormat {
  prefix: string,
  compress: (s: PronounsStorage) => string,
  decompress: (s: string) => PronounsStorage,
}
