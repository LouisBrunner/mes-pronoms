import {TABLE} from 'logic/content/choices'
import {GRAMMAR} from 'logic/content/grammar'
import {IPronounsChoice} from 'logic/content/pronouns/types'
import {IPronounStore, PronounKind, PronounPick} from 'logic/types'
import {pluralize} from 'logic/utils'

interface PronounViewProps {
  store: IPronounStore,
  pronoun: PronounKind,
}

const choosePronoun = (choices: IPronounsChoice, pronoun: PronounPick): string | undefined => {
  if (pronoun === undefined) {
    return undefined
  }
  if (typeof pronoun === 'string') {
    return pronoun
  }
  return choices[pronoun].word
}

export const PronounView = ({store, pronoun}: PronounViewProps): JSX.Element => {
  const grammar = GRAMMAR.pronouns[pronoun]
  const singularChoice = choosePronoun(TABLE.pronouns[pronoun], store.get(pronoun))
  const pluralChoice = pluralize(singularChoice ?? 'MISSING')

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
      {singularChoice === undefined ? (
        <p><strong>Non renseigné</strong></p>
      ) : (
        <>
          <p>Il faut utiliser <strong>{singularChoice}/{pluralChoice}</strong></p>
          <div>
            Examples:
            <ul>
              <li><em>Singulier</em>: {grammar.examples.singularWith(singularChoice)}</li>
              <li><em>Pluriel</em>: {grammar.examples.pluralWith(pluralChoice)}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
