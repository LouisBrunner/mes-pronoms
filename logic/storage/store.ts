import {IPronounStore, PronounKind, PronounPick, PronounChangeEventDetails, ExportOptions} from 'logic/types'
import {packStore, unpackStore} from 'logic/storage/packing'
import {emptyStorage, isStorage, PronounsStorage} from 'logic/storage/types'
import {ensureChoice, choosePronoun} from 'logic/business'
import {benchmarkFormats} from 'logic/storage/format'

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

    // FIXME: debug
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: debug code
      window.benchmarkFormats = (store: PronounsStorage = this.#store): Record<string, string> => {
        return benchmarkFormats(store)
      }
    }
  }

  get(pronoun: PronounKind): PronounPick | undefined {
    return this.#store.pronouns[pronoun]
  }

  set(pronoun: PronounKind, choiceRaw: PronounPick | undefined): void {
    let choice = choiceRaw
    if (typeof choiceRaw === 'string') {
      choice = ensureChoice(pronoun, choiceRaw)
    }

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
    const includes: PronounKind[] = [
      'PronomSujet',
    ]
    if (includes.find((pronoun) => {
      return this.#store.pronouns[pronoun] === undefined
    })) {
      return 'N/A'
    }
    return includes.map((pronoun) => {
      return choosePronoun(pronoun, this.#store.pronouns[pronoun]).word
    }).join('/')
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
