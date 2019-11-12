import React from 'react'
import { PronounList, IPronounsManager } from 'logic/IPronounsManager'
import PronomCard from 'components/PronomCard'

interface Props {
  manager: IPronounsManager,
}

const PronounsViewer: React.FunctionComponent<Props> = ({ manager }) => (
  <>
    <style jsx>{`
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
      }

      .containee {
        padding: 10px 5px;
      }

      h1 {
        text-align: center;
      }
    `}</style>

    <h1>Mes Pronoms</h1>

    <div className="container">
      {PronounList.map((pronoun, i) => (
        <div className="containee">
          <PronomCard key={i} manager={manager} pronoun={pronoun} />
        </div>
      ))}
    </div>
  </>
)

export default PronounsViewer
