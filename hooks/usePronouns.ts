import {PronounStore} from 'logic/storage/store'
import {IPronounStore} from 'logic/types'
import {useEffect, useRef, useState} from 'react'

export const usePronouns = (data: string | null): IPronounStore => {
  const previousData = useRef(data)
  const [store, setStore] = useState<IPronounStore>(() => {
    return new PronounStore(null)
  })
  useEffect(() => {
    setStore(new PronounStore(data))
    previousData.current = data
  }, [data, setStore])
  return store
}
