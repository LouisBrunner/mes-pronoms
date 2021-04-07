import {IPronounStore} from 'logic/types'
import {useCallback, useState} from 'react'
import {Copiable} from 'components/basic/Copiable'
import {useWatchPronouns} from 'hooks/useWatchPronouns'

export type PronounShortFormProps = {
  store: IPronounStore,
}

export const PronounShortForm = ({store}: PronounShortFormProps): JSX.Element => {
  const [shortForm, setShortForm] = useState(store.shortForm())

  useWatchPronouns({
    store,
    initial: true,
    observer: useCallback(() => {
      setShortForm(store.shortForm())
    }, [store, setShortForm])
  })

  return <div>Référence: <Copiable>{shortForm}</Copiable></div>
}
