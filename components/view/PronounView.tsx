import {choosePronoun, fetchGrammar} from 'logic/business'
import {IPronounStore, PronounKind} from 'logic/types'
import {PronounChoice} from 'components/view/PronounChoice'

interface PronounViewProps {
  store: IPronounStore,
  pronoun: PronounKind,
}

export const PronounView = ({store, pronoun}: PronounViewProps): JSX.Element => {
  const grammar = fetchGrammar(pronoun)
  const pick = store.get(pronoun)
  const choice = choosePronoun(pronoun, pick)

  return (
    <div>
      <h4>{grammar.title}</h4>
      <p>{grammar.description}</p>
      {choice === undefined ? (
        <p><strong>Non renseigné</strong></p>
      ) : (
        <PronounChoice choice={choice} grammar={grammar} />
      )}
    </div>
  )
}
