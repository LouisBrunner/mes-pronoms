import {ExportOptions, IPronounStore} from 'logic/types'

export const makeURL = (action: string, store: IPronounStore, options: ExportOptions = {compress: false}): string => {
  return `/${action}/${store.export(options)}`
}
