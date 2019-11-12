import React from 'react'
import { Pronouns, IPronounsManager, IPronounChoice } from 'logic/IPronounsManager'
import Content from 'logic/PronounsContent'

interface Props {
  manager: IPronounsManager,
  pronoun: Pronouns,
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

const PronomCard: React.FunctionComponent<Props> = ({ manager, pronoun }) => {
  const content = Content[pronoun]
  const singularChoice = findPronoun(content.choices.singular, manager.getPronoun(pronoun, true))
  const pluralChoice = findPronoun(content.choices.plural, manager.getPronoun(pronoun, false))

  return (
    <div>
      <div>{content.text.title}: {content.text.description}</div>
      <div>Il faut utiliser <strong>{singularChoice}/{pluralChoice}</strong></div>
      <div>
        Examples:
        <div>Singulier: {content.text.examples.singularWith(singularChoice)}</div>
        <div>Pluriel: {content.text.examples.pluralWith(pluralChoice)}</div>
      </div>
    </div>
  )
}

export default PronomCard
