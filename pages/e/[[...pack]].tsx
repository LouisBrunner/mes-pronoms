import {Layout} from 'components/Layout'
import {PronounsEditor} from 'components/edit/PronounsEditor'
import {PronounShortForm} from 'components/view/PronounShortForm'
import {usePronounsFromQuery} from 'hooks/usePronounsFromQuery'
import {useWatchPronouns} from 'hooks/useWatchPronouns'
import {makeURL} from 'logic/helpers'
import {NextPage} from 'next'
import Link from 'next/link'
import {useCallback, useState} from 'react'

type EditPronounsProps = {
  empty?: undefined,
}

const EditPronouns: NextPage<EditPronounsProps> = (): JSX.Element => {
  const {router, store, compressed: compress} = usePronounsFromQuery()
  const [isValid, setValid] = useState(true)
  const [viewURL, setViewURL] = useState(makeURL('v', store, {compress}))

  useWatchPronouns({
    store,
    initial: () => {
      setViewURL(makeURL('v', store, {compress}))
    },
    observer: useCallback(async () => {
      setViewURL(makeURL('v', store, {compress}))
      await router.replace(makeURL('e', store, {compress}), undefined, {shallow: true})
    }, [router, setViewURL, compress, store]),
  })

  return (
    <Layout>
      <PronounShortForm store={store} />
      {isValid ? <Link href={viewURL}>Enregister/Partager</Link> : <span>Invalide</span>}

      <PronounsEditor store={store} onValid={setValid} />
    </Layout>
  )
}

export default EditPronouns
