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
      this.#store = unpackStore(data)
    }
  }

  get(pronoun: PronounKind): PronounPick | undefined {
    return this.#store.pronouns[pronoun]
  }

  set(pronoun: PronounKind, choice: PronounPick | undefined): void {
    this.#store.pronouns[pronoun] = choice
  }

  export(options: {compress: boolean}): string {
    return packStore(this.#store, options)
  }
}
