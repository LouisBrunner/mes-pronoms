import {IPronounStore, PronounKind, PronounPick} from 'logic/types'
import {packStore, unpackStore} from './packing'
import {emptyStorage, isStorage, PronounsStorage} from './types'

export class PronounStore implements IPronounStore {
  #store: PronounsStorage

  constructor(data: PronounsStorage | string | null) {
    if (data === null) {
      this.#store = emptyStorage()
    } else if (isStorage(data)) {
      this.#store = data
    } else {
      this.#store = this.#deserialize(data)
    }
  }

  public get(pronoun: PronounKind, singular: boolean): PronounPick {
    const values = this.#store.pronouns[pronoun]
    if (!values) {
      return undefined
    }
    return singular ? values.singular : values.plural
  }

  public set(pronoun: PronounKind, singular: boolean, choice: PronounPick): void {
    const values = this.#store.pronouns[pronoun]
    if (singular) {
      if (values === undefined) {
        this.#store.pronouns[pronoun] = {singular: choice}
      } else {
        values.singular = choice
      }
    } else {
      if (values === undefined) {
        throw new Error('define the singular before the plural')
      }
      values.plural = choice
    }
  }

  public export(options: {compress: boolean}): string {
    return this.#serialize(this.#store, options)
  }

  #deserialize = (raw: string): PronounsStorage => {
    return unpackStore(raw)
  }

  #serialize = (store: PronounsStorage, options: {compress: boolean}): string => {
    return packStore(store, options)
  }
}
