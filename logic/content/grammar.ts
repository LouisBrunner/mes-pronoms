import {PronounKind} from 'logic/types'
import {capitalize} from 'logic/utils'

export interface IPronounContent {
  readonly title: string;
  readonly description: string;
  readonly examples: {
    singularWith(pronoun: string): string;
    pluralWith(pronoun: string): string;
  }
}

export interface IPronounGrammar {
  readonly pronouns: {
    [P in PronounKind]: IPronounContent;
  }
}

export const GRAMMAR: IPronounGrammar = {
  pronouns: {
    PronomSujet: {
      title: 'Pronom sujet',
      description: `Le pronom sujet remplace le sujet dans une phrase`,
      examples: {
        singularWith(pronoun: string): string {
          return `Alex va à l'école. ${capitalize(pronoun)} aime bien l'anglais.`
        },
        pluralWith(pronoun: string): string {
          return `Alex et ses amis vont en vacances. ${capitalize(pronoun)} partent en Catalogne.`
        },
      },
    }
  }
}
