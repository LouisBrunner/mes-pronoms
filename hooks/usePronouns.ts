import {PronounStore} from 'logic/storage/store'
import {IPronounStore} from 'logic/types'
import {useEffect, useRef} from 'react'

export const usePronouns = (data: string | null): IPronounStore => {
  const store = useRef<IPronounStore>(new PronounStore())
  useEffect(() => {
    if (data === null) {
      return
    }
    store.current.init(data)
  }, [data])
  return store.current
}
