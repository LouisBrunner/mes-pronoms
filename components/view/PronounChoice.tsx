import {ChosenPronoun} from 'logic/business'
import {IPronounContent} from 'logic/content/grammar'
import {pluralize} from 'logic/utils'
import {Speakable} from 'components/basic/Speakable'
import {Typography} from '@material-ui/core'

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
      <Typography paragraph>Il faut utiliser {pronouns}</Typography>
      <div>
        <Typography>Examples:</Typography>
        <ul>
          <li><Typography><em>Singulier</em>: {grammar.examples.singularWith(choice.word)}</Typography></li>
          <li><Typography><em>Pluriel</em>: {grammar.examples.pluralWith(pluralChoice)}</Typography></li>
        </ul>
      </div>
    </>
  )
}
