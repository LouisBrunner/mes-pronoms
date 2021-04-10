import {Grid} from '@material-ui/core'
import {PronounChooser} from 'components/edit/PronounChooser'
import {IPronounStore, PronounKind, PronounList} from 'logic/types'
import {useCallback, useRef} from 'react'

export interface PronounsEditorProps {
  store: IPronounStore,
  onValid: (valid: boolean) => void,
}

export const PronounsEditor = ({store, onValid}: PronounsEditorProps): JSX.Element => {
  const validPronouns = useRef<Partial<Record<PronounKind, boolean>>>({})
  const setValid = useCallback((pronoun: PronounKind, valid: boolean): void => {
    validPronouns.current[pronoun] = valid
    const reduced = PronounList.reduce<boolean>((allValid: boolean, pronoun: PronounKind): boolean => {
      return validPronouns.current[pronoun] && allValid
    }, true)
    onValid(reduced)
  }, [validPronouns, onValid])

  return (
    <Grid container spacing={4}>
      {PronounList.map((pronoun) => {
        return (
          <Grid item key={pronoun} xs={12} sm={6} md={4}>
            <PronounChooser store={store} pronoun={pronoun} onValid={(valid: boolean): void => {
              setValid(pronoun, valid)
            }} />
          </Grid>
        )
      })}
    </Grid>
  )
}
