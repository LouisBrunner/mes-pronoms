import React from 'react'
import {PronounView} from 'components/view/PronounView'
import {IPronounStore, PronounList} from 'logic/types'
import {Grid} from '@material-ui/core'

interface PronounsViewerProps {
  store: IPronounStore,
}

export const PronounsViewer = ({store}: PronounsViewerProps): JSX.Element => {
  return (
    <Grid container spacing={4}>
      {PronounList.map((pronoun) => {
        return (
          <Grid item key={pronoun} xs={12} sm={6} md={4}>
            <PronounView store={store} pronoun={pronoun} />
          </Grid>
        )
      })}
    </Grid>
  )
}
