import {ExportOptions, IPronounStore} from 'logic/types'

export const makeURL = (action: string, store: IPronounStore, options: ExportOptions): string => {
  return `/${action}/${store.export(options)}`
}
