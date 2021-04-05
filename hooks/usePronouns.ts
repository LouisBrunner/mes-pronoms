import {PronounStore} from 'logic/storage/store'
import {IPronounStore} from 'logic/types'
import {useEffect, useState} from 'react'

export const usePronouns = (data: string | null): IPronounStore => {
  const [store, setStore] = useState<IPronounStore>((): IPronounStore => {
    return new PronounStore(null)
  })
  useEffect(() => {
    setStore(new PronounStore(data))
  }, [data, setStore])
  return store
}
