import {compressToBase64, decompressFromBase64} from 'lz-string'

const identity = (s: string): string => {
  return s
}

export interface WireFormat {
  prefix: string,
  compress: (s: string) => string,
  decompress: (s: string) => string,
  escapeString: (s: string) => string,
  unescapeString: (s: string) => string,
}

export const TEXT_FORMAT: WireFormat = {
  prefix: 't',
  compress: identity,
  decompress: identity,
  escapeString: encodeURIComponent,
  unescapeString: decodeURIComponent,
}

export const LZ_FORMAT: WireFormat = {
  prefix: 'z',
  compress: compressToBase64,
  decompress: decompressFromBase64,
  escapeString: identity,
  unescapeString: identity,
}

export const WIRE_FORMATS = {
  [TEXT_FORMAT.prefix]: TEXT_FORMAT,
  [LZ_FORMAT.prefix]: LZ_FORMAT,
}
