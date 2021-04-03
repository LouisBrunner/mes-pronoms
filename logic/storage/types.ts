import {PronounKind, SamePlural} from 'logic/types'

export type PronounsStorage = {
  pronouns: {
    [P in PronounKind]?: {
      singular: number | string,
      plural?: number | string | typeof SamePlural,
    };
  },
}

export const emptyStorage = (): PronounsStorage => {
  return {pronouns: {}}
}

export const isStorage = (data: PronounsStorage | string): data is PronounsStorage => {
  return (data as PronounsStorage)?.pronouns !== undefined
}
