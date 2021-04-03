import {PronounKind} from 'logic/types'
import {PronomSujetChoices} from './pronouns/PronomSujet'
import {IPronounsChoice} from './pronouns/types'

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
