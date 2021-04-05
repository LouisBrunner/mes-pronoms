import {IPronounStore, PronounChangeEvent} from 'logic/types'
import {useEffect} from 'react'

export type usePronounsChangedProps = {
  store: IPronounStore,
  observer: (e: PronounChangeEvent) => void,
}

export const usePronounsChanged = ({store, observer}: usePronounsChangedProps): void => {
  useEffect(() => {
    store.addEventListener('changed', observer)
    return (): void => {
      store.removeEventListener('changed', observer)
    }
  }, [store, observer])
}
