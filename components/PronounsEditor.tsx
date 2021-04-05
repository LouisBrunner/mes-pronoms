import {PronounChooser} from 'components/PronounChooser'
import {IPronounStore, PronounKind, PronounList} from 'logic/types'
import {useCallback, useRef} from 'react'

export interface PronounsEditorProps {
  store: IPronounStore,
  onValid: (valid: boolean) => void,
}

export const PronounsEditor = ({store, onValid}: PronounsEditorProps): JSX.Element => {
  const validPronouns = useRef<Partial<Record<PronounKind, boolean>>>({})
  const setValid = useCallback((pronoun: PronounKind, valid: boolean): void => {
    console.log(pronoun, valid)
    validPronouns.current[pronoun] = valid
    const reduced = PronounList.reduce<boolean>((allValid: boolean, pronoun: PronounKind): boolean => {
      return validPronouns.current[pronoun] && allValid
    }, true)
    onValid(reduced)
  }, [validPronouns, onValid])

  return (
    <div>
      {PronounList.map((pronoun) => {
        return (
          <div key={pronoun}>
            <PronounChooser store={store} pronoun={pronoun} onValid={(valid: boolean): void => {
              setValid(pronoun, valid)
            }} />
          </div>
        )
      })}
    </div>
  )
}
