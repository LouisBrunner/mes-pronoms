import { Pronouns, IPronounText, IPronounChoices } from 'logic/IPronounsManager'

const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

type IContent = {[P in Pronouns]: {
  readonly text: IPronounText;
  readonly choices: IPronounChoices;
}}

const TODOOBJ = {
  text: {
    title: 'Pronom sujet2',
    description: 'TODO',
    examples: {
      singularWith(pronoun: string): string { return `${capitalize(pronoun)} est allé·e se trouver du travail.` },
      pluralWith(pronoun: string): string { return `${capitalize(pronoun)} font de l’exercice régulièrement.` },
    },
  },
  choices: {
    singular: {
      choices: [
        'iel2',
        'il',
        'elle',
        'ille',
        'ul',
        'ol',
      ],
      writeIn: true,
    },
    plural: {
      choices: [
        'iels',
      ],
      writeIn: true,
    },
  },
}

const Content: IContent = {
  [Pronouns.PronomSujet]: {
    text: {
      title: 'Pronom sujet',
      description: 'TODO',
      examples: {
        singularWith(pronoun: string): string { return `${capitalize(pronoun)} est allé·e se trouver du travail.` },
        pluralWith(pronoun: string): string { return `${capitalize(pronoun)} font de l’exercice régulièrement.` },
      },
    },
    choices: {
      singular: {
        choices: [
          'iel',
          'il',
          'elle',
          'ille',
          'ul',
          'ol',
        ],
        writeIn: true,
      },
      plural: {
        choices: [
          'iels',
        ],
        writeIn: true,
      },
    },
  },
  [Pronouns.PronomObjet]: TODOOBJ,
  [Pronouns.DeterminantPossessif]: TODOOBJ,
  [Pronouns.PronomPossessif]: TODOOBJ,
  [Pronouns.DeterminantDemonstratif]: TODOOBJ,
  [Pronouns.PronomDemonstratif]: TODOOBJ,
  [Pronouns.ArticleDefini]: TODOOBJ,
  [Pronouns.ArticleIndefini]: TODOOBJ,
  [Pronouns.ArticleIndefiniTout]: TODOOBJ,
  [Pronouns.ArticlePartitif]: TODOOBJ,
  [Pronouns.TitreFamille]: TODOOBJ,
  [Pronouns.TitreTravail]: TODOOBJ,
  [Pronouns.Accords]: TODOOBJ,
}

export default Content
