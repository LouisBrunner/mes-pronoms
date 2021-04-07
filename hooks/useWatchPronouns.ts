import {IPronounStore, PronounChangeEvent} from 'logic/types'
import {useEffect} from 'react'

export type useWatchPronounsProps = {
  store: IPronounStore,
  initial?: true | (() => void),
  observer: (e: PronounChangeEvent | null) => void,
}

export const useWatchPronouns = ({store, initial, observer}: useWatchPronounsProps): void => {
  useEffect(() => {
    if (!initial) {
      return
    }
    if (typeof initial === 'boolean') {
      observer(null)
    } else {
      initial()
    }
  }, [observer, initial]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    store.addEventListener('changed', observer)
    return (): void => {
      store.removeEventListener('changed', observer)
    }
  }, [store, observer])
}
