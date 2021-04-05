import {IPronounStore} from 'logic/types'
import {useEffect} from 'react'

export type usePronounsChangedProps = {
  store: IPronounStore,
  observer: () => void,
}

export const usePronounsChanged = ({store, observer}: usePronounsChangedProps): void => {
  useEffect(() => {
    observer()
    store.addEventListener('changed', observer)
    return (): void => {
      store.removeEventListener('changed', observer)
    }
  }, [store, observer])
}
