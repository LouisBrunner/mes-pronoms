import {ChosenPronoun} from 'logic/business'
import {IPronounContent} from 'logic/content/grammar'
import {pluralize} from 'logic/utils'
import {Speakable} from 'components/Speakable'

interface PronounChoiceProps {
  choice: ChosenPronoun,
  grammar: IPronounContent,
}

export const PronounChoice = ({choice, grammar}: PronounChoiceProps): JSX.Element => {
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
