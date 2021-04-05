import {IPronounStore, PronounKind, PronounPick, PronounChangeEventDetails, ExportOptions} from 'logic/types'
import {packStore, unpackStore} from 'logic/storage/packing'
import {emptyStorage, isStorage, PronounsStorage} from 'logic/storage/types'

export class PronounStore extends EventTarget implements IPronounStore {
  #store: PronounsStorage
  #cachedExport: Record<string, string>

  constructor(data: PronounsStorage | string | null) {
    super()
    this.#cachedExport = {}

    if (data === null) {
      this.#store = emptyStorage()
    } else if (isStorage(data)) {
      this.#store = data
    } else {
      try {
        this.#store = unpackStore(data)
      } catch (e) {
        const err = e as Error
        console.error(`failed to parse: ${err.message}`)
        this.#store = emptyStorage()
      }
    }
  }

  get(pronoun: PronounKind): PronounPick | undefined {
    return this.#store.pronouns[pronoun]
  }

  set(pronoun: PronounKind, choice: PronounPick | undefined): void {
    if (this.#store.pronouns[pronoun] === choice) {
      return
    }
    this.#store.pronouns[pronoun] = choice
    this.#cachedExport = {}
    this.dispatchEvent(
      new CustomEvent<PronounChangeEventDetails>('changed', {detail: {pronoun, choice}}),
    )
  }

  shortForm(): string {
    // TODO: finish
    // const pieces = []

    // return pieces.join(' / ')
    return 'N/A'
  }

  export(options: ExportOptions): string {
    const cacheKey = options.compress ? 'compressed' : 'non-compress'
    if (this.#cachedExport?.[cacheKey] !== undefined) {
      return this.#cachedExport[cacheKey]
    }
    this.#cachedExport[cacheKey] = packStore(this.#store, options)
    return this.#cachedExport[cacheKey]
  }
}
