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

      <h4>{content.text.title}</h4>
      <p>{content.text.description}</p>
      <p>Il faut utiliser <strong>{singularChoice}/{pluralChoice}</strong></p>
      <div>
        Examples:
        <ul>
          <li><em>Singulier</em>: {content.text.examples.singularWith(singularChoice)}</li>
          <li><em>Pluriel</em>: {content.text.examples.pluralWith(pluralChoice)}</li>
        </ul>
      </div>
    </div>
  )
}

export default PronomCard
