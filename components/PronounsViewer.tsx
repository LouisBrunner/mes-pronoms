import React from 'react'
import {PronounView} from 'components/PronounView'
import {IPronounStore, PronounList} from 'logic/types'

interface PronounsViewerProps {
  store: IPronounStore,
}

export const PronounsViewer = ({store}: PronounsViewerProps): JSX.Element => {
  return (
    <div>
      {PronounList.map((pronoun) => {
        return (
          <div key={pronoun}>
            <PronounView store={store} pronoun={pronoun} />
          </div>
        )
      })}
    </div>
  )
}
