import {IPronounStore} from 'logic/types'
import {useEffect, useState} from 'react'

export type PronounShortFormProps = {
  store: IPronounStore,
}

export const PronounShortForm = ({store}: PronounShortFormProps): JSX.Element => {
  const [shortForm, setShortForm] = useState(store.shortForm())
  useEffect(() => {
    setShortForm(store.shortForm())

    const observer = (): void => {
      setShortForm(store.shortForm())
    }
    store.addEventListener('changed', observer)
    return (): void => {
      store.removeEventListener('changed', observer)
    }
  }, [store, setShortForm])

  return <div>{shortForm}</div>
}
