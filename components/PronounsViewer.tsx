import React from 'react'
import {PronomCard} from 'components/PronomCard'
import {IPronounStore, LIST} from 'logic/types'

interface PronounsViewerProps {
  store: IPronounStore,
}

export const PronounsViewer = ({store}: PronounsViewerProps): JSX.Element => {
  return (
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
        {LIST.map((pronoun, i) => {
          return (
            <div key={pronoun} className="containee">
              <PronomCard key={i} store={store} pronoun={pronoun} />
            </div>
          )
        })}
      </div>
    </>
  )
}
