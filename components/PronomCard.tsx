import {IPronounChoice, TABLE} from 'logic/content/choices'
import {GRAMMAR} from 'logic/content/grammar'
import {IPronounStore, PronounKind} from 'logic/types'

interface PronomCardProps {
  store: IPronounStore,
  pronoun: PronounKind,
}

const findPronoun = (content: IPronounChoice | string, pronoun: number | string | undefined): string => {
  if (typeof content === 'string') {
    return content
  }

  if (typeof pronoun === 'string') {
    if (content.writeIn) {
      return pronoun
    }
    return content.choices[0]
  }
  if (pronoun === undefined) {
    return content.choices[0]
  }
  return content.choices[pronoun]
}

export const PronomCard = ({store, pronoun}: PronomCardProps): JSX.Element => {
  const grammar = GRAMMAR.pronouns[pronoun]
  const choices = TABLE.pronouns[pronoun]
  const singularChoice = findPronoun(choices.singular, store.get(pronoun, true))
  const pluralChoice = findPronoun(choices.plural, store.get(pronoun, false))

  return (
    <div className="card">
      <style jsx>{`
        .card {
          background: #EEE;
          border-radius: 2px;
          padding: 10px 15px;
        }

        h4, ul {
          margin: 0;
        }
      `}</style>

      <h4>{grammar.title}</h4>
      <p>{grammar.description}</p>
      <p>Il faut utiliser <strong>{singularChoice}/{pluralChoice}</strong></p>
      <div>
        Examples:
        <ul>
          <li><em>Singulier</em>: {grammar.examples.singularWith(singularChoice)}</li>
          <li><em>Pluriel</em>: {grammar.examples.pluralWith(pluralChoice)}</li>
        </ul>
      </div>
    </div>
  )
}
