import {PronounKind} from 'logic/types'
import {PronomSujetChoices} from 'logic/content/pronouns/PronomSujet'
import {IPronounsChoice} from 'logic/content/pronouns/types'

export interface IPronounTable {
  readonly pronouns: {
    [P in PronounKind]: IPronounsChoice;
  }
}

export const TABLE: IPronounTable = {
  pronouns: {
    PronomSujet: PronomSujetChoices,
  },
}
