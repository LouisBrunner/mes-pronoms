import {choosePronoun, fetchGrammar} from 'logic/business'
import {IPronounStore, PronounKind} from 'logic/types'
import {PronounChoice} from 'components/view/PronounChoice'
import {usePronoun} from 'hooks/usePronoun'

interface PronounViewProps {
  store: IPronounStore,
  pronoun: PronounKind,
}

export const PronounView = ({store, pronoun}: PronounViewProps): JSX.Element => {
  const picked = usePronoun(store, pronoun)
  const grammar = fetchGrammar(pronoun)
  const choice = choosePronoun(pronoun, picked)

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
