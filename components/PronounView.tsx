import {TABLE} from 'logic/content/choices'
import {GRAMMAR, IPronounContent} from 'logic/content/grammar'
import {IPronounsChoice} from 'logic/content/pronouns/types'
import {IPronounStore, PronounKind, PronounPick} from 'logic/types'
import {pluralize} from 'logic/utils'
import {Speakable} from './Speakable'

interface Choice {
  readonly word: string;
  readonly ipa?: string;
}

const choosePronoun = (choices: IPronounsChoice, pronoun: PronounPick): Choice | undefined => {
  if (pronoun === undefined) {
    return undefined
  }
  if (typeof pronoun === 'string') {
    return {word: pronoun}
  }
  return choices[pronoun]
}

interface PronounChoiceProps {
  choice: Choice,
  grammar: IPronounContent,
}

const PronounChoice = ({choice, grammar}: PronounChoiceProps): JSX.Element => {
  const pluralChoice = pluralize(choice.word)
  let pronouns = <><strong>{choice.word}/{pluralChoice}</strong></>
  if (choice.ipa) {
    pronouns = <Speakable ipa={choice.ipa} word={choice.word}>{pronouns}</Speakable>
  }

  return (
    <>
      <p>Il faut utiliser {pronouns}</p>
      <div>
        Examples:
        <ul>
          <li><em>Singulier</em>: {grammar.examples.singularWith(choice.word)}</li>
          <li><em>Pluriel</em>: {grammar.examples.pluralWith(pluralChoice)}</li>
        </ul>
      </div>
    </>
  )
}

interface PronounViewProps {
  store: IPronounStore,
  pronoun: PronounKind,
}

export const PronounView = ({store, pronoun}: PronounViewProps): JSX.Element => {
  const grammar = GRAMMAR.pronouns[pronoun]
  const choice = choosePronoun(TABLE.pronouns[pronoun], store.get(pronoun))

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
      {choice === undefined ? (
        <p><strong>Non renseigné</strong></p>
      ) : (
        <PronounChoice choice={choice} grammar={grammar} />
      )}
    </div>
  )
}
