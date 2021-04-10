import EventTarget from '@ungap/event-target'
import {IPronounStore, PronounKind, PronounPick, PronounChangeEventDetails, ExportOptions} from 'logic/types'
import {packStore, unpackStore} from 'logic/storage/packing'
import {emptyStorage, PronounsStorage} from 'logic/storage/types'
import {ensureChoice, choosePronoun} from 'logic/business'
import {benchmarkFormats} from 'logic/storage/format'

export class PronounStore extends EventTarget implements IPronounStore {
  #store: PronounsStorage
  #cachedExport: Record<string, string>

  constructor() {
    super()
    this.#cachedExport = {}
    this.#store = emptyStorage()
  }

  init(data: string): void {
    try {
      this.#store = unpackStore(data)
    } catch (e) {
      const err = e as Error
      console.error(`failed to parse: ${err.message}`)
      this.#store = emptyStorage()
    }
    this.#cachedExport = {}
    this.dispatchEvent(new CustomEvent<PronounChangeEventDetails>('changed', null))

    // FIXME: debug
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: debug code
      window.store = this
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
      return undefined
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
