import {Layout} from 'components/Layout'
import {PronounsEditor} from 'components/PronounsEditor'
import {PronounShortForm} from 'components/PronounShortForm'
import {usePackedPronouns} from 'hooks/usePackedPronouns'
import {makeURL} from 'logic/helpers'
import {NextPage} from 'next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

type EditPronounsProps = {
  empty?: undefined,
}

const EditPronouns: NextPage<EditPronounsProps> = (): JSX.Element => {
  const router = useRouter()
  const {store, compressed: compress} = usePackedPronouns()
  const [isValid, setValid] = useState(true)
  const [viewURL, setViewURL] = useState(makeURL('v', store, {compress}))

  // FIXME: nextjs ssr?
  useEffect(() => {
    setViewURL(makeURL('v', store, {compress}))
  }, [store, compress, setViewURL])

  useEffect(() => {
    const observer = async (): Promise<void> => {
      setViewURL(makeURL('v', store, {compress}))
      await router.replace(makeURL('e', store, {compress}), undefined, {shallow: true})
    }

    // FIXME: wtf eslint?
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    store.addEventListener('changed', observer)
    return (): void => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      store.removeEventListener('changed', observer)
    }
  }, [router, store, setViewURL, compress])

  return (
    <Layout>
      <PronounShortForm store={store} />
      {isValid ? <Link href={viewURL}>Enregister/Partager</Link> : <span>Invalide</span>}

      <PronounsEditor store={store} onValid={setValid} />
    </Layout>
  )
}

export default EditPronouns
