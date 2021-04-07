import {IPronounStore, PronounChangeEvent, PronounKind, PronounPick} from 'logic/types'
import {useCallback, useState} from 'react'
import {useWatchPronouns} from './useWatchPronouns'

export const usePronoun = (store: IPronounStore, pronoun: PronounKind): PronounPick => {
  const [picked, setPicked] = useState(store.get(pronoun))

  useWatchPronouns({
    store,
    initial: true,
    observer: useCallback((e: PronounChangeEvent) => {
      if (e !== null && e.detail !== null && e.detail.pronoun !== pronoun) {
        return
      }
      setPicked(store.get(pronoun))
    }, [store, setPicked, pronoun]),
  })

  return picked
}
