import {PB_FORMAT} from 'logic/storage/format/pb'
import {TEXT_FORMAT} from 'logic/storage/format/text'

export {PB_FORMAT, TEXT_FORMAT}

export const WIRE_FORMATS = {
  [TEXT_FORMAT.prefix]: TEXT_FORMAT,
  [PB_FORMAT.prefix]: PB_FORMAT,
}
