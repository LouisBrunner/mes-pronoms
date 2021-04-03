import {PronounStore} from 'logic/storage/store'
import {IPronounStore} from 'logic/types'
import {useState} from 'react'

export const usePronouns = (queryData: string | null): IPronounStore => {
  const data = queryData !== null ? queryData : null
  const [pronouns] = useState<IPronounStore>(() => {
    return new PronounStore(data)
  })
  return pronouns
}
