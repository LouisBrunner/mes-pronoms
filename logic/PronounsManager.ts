import { Pronouns, PronounList, IPronounsManager } from 'logic/IPronounsManager'

type PronounsStorage = {
  [Key in Pronouns]: {
    singular: number | string,
    plural?: number | string,
  }
}

interface DataPayload {
  pronouns: PronounsStorage,
}

class PronounsManager implements IPronounsManager {
  private managed: boolean
  private pronouns: PronounsStorage = getDefaultStorage()

  private readonly localKey = 'data'

  constructor(data: string | null) {
    if (data === null) {
      this.managed = true
      if (process.browser) {
        const saved = localStorage.getItem(this.localKey)
        if (saved) {
          this.init(saved)
        }
      }
    } else {
      this.managed = false
      this.init(data)
    }
  }

  public getPronoun(pronoun: Pronouns, singular: boolean): number | string | undefined {
    const values = this.pronouns[pronoun]
    if (singular) {
      return values.singular
    }
    return values.plural
  }

  public setPronoun(pronoun: Pronouns, singular: boolean, choice: number | string): void {
    const values = this.pronouns[pronoun]
    if (singular) {
      values.singular = choice
    } else {
      values.plural = choice
    }
    if (this.managed) {
      this.save()
    }
  }

  public export(): string {
    return this.serialize(this.pack())
  }

  private init(data: string): void {
    const payload = this.deserialize(data)
    this.pronouns = payload.pronouns
  }

  private save(): void {
    localStorage.setItem(this.localKey, this.serialize(this.pack()))
  }

  private pack(): DataPayload {
    return {
      pronouns: this.pronouns,
    }
  }

  private deserialize(data: string): DataPayload {
    try {
      return JSON.parse(atob(data))
    } catch (e) {
      console.error(`Invalid deserializion from '${data}': ${e}`)
      return { pronouns: getDefaultStorage() }
    }
  }

  private serialize(data: DataPayload): string {
    return btoa(JSON.stringify({ pronouns: data.pronouns }))
  }
}

const getDefaultStorage = (): PronounsStorage => {
  const storage = {} as PronounsStorage
  for (const p of PronounList) {
    storage[p] = {
      singular: 0,
    }
  }
  return storage
}

export default PronounsManager
