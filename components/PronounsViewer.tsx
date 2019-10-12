import React from 'react'
import { Pronouns, IPronounsManager } from 'logic/IPronounsManager'

interface Props {
  manager: IPronounsManager,
}

const PronounsViewer: React.FunctionComponent<Props> = ({ manager }) => (
  <div>Pronom sujet: {manager.getPronoun(Pronouns.PronomSujet)}</div>
)

export default PronounsViewer
