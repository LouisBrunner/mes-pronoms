import {PronounKind} from 'logic/types'
import {pluralize} from 'logic/utils'

export interface IPronounChoice {
  readonly choices: string[];
  readonly writeIn: boolean;
}

export interface IPronounsChoice {
  readonly singular: IPronounChoice;
  readonly plural: IPronounChoice;
}

export interface IPronounTable {
  readonly pronouns: {
    [P in PronounKind]: IPronounsChoice;
  }
}

const pluralizeChoices = (choices: string[], options: Omit<IPronounChoice, 'choices'>): IPronounsChoice => {
  return {
    singular: {
      choices,
      ...options,
    },
    plural: {
      choices: choices.map(pluralize),
      ...options,
    }
  }
}

export const TABLE: IPronounTable = {
  pronouns: {
    PronomSujet: pluralizeChoices([
      'iel',
      'yel',
      'il',
      'elle',
      'ille',
      'ul',
      'ol',
      'yol',
      'ael',
      'im',
      'em',
      'ille',
      'el',
    ],
    {writeIn: true},
  ),
  },
}
