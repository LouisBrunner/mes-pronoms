import { Pronouns, IPronounsManager } from 'logic/IPronounsManager'

type PronounsStorage = {
  [Key in Pronouns]?: string
}

interface DataPayload {
  pronouns: PronounsStorage,
}

class PronounsManager implements IPronounsManager {
  private managed: boolean
  private pronouns: PronounsStorage = {
    [Pronouns.PronomSujet]: 'iel',
  }

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

  public getPronoun(pronoun: Pronouns): string | null {
    if (pronoun in this.pronouns) {
      return this.pronouns[pronoun] as string
    }
    return null
  }

  public setPronoun(pronoun: Pronouns, choice: string): void {
    this.pronouns[pronoun] = choice
    if (this.managed) {
      this.save()
    }
  }

  public getPronounChoices(pronoun: Pronouns): string[] {
    if (pronoun === Pronouns.PronomSujet) {
      return ['a', 'b']
    }
    return ['c', 'd']
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
      return { pronouns: {} }
    }
  }

  private serialize(data: DataPayload): string {
    return btoa(JSON.stringify({ pronouns: data.pronouns }))
  }
}

export default PronounsManager
