import {PronounKind, PronounPick} from 'logic/types'

export type PronounsStorage = {
  pronouns: {
    [P in PronounKind]?: PronounPick
  },
}

export const emptyStorage = (): PronounsStorage => {
  return {pronouns: {}}
}

export const isStorage = (data: PronounsStorage | string): data is PronounsStorage => {
  return (data as PronounsStorage)?.pronouns !== undefined
}
