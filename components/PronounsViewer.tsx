import React from 'react'
import { PronounList, IPronounsManager } from 'logic/IPronounsManager'
import PronomCard from 'components/PronomCard'

interface Props {
  manager: IPronounsManager,
}

const PronounsViewer: React.FunctionComponent<Props> = ({ manager }) => (
  <>
    {PronounList.map((pronoun, i) => (
      <PronomCard key={i} manager={manager} pronoun={pronoun} />
    ))}
  </>
)

export default PronounsViewer
