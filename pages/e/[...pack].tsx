import {Layout} from 'components/Layout'
import {PronounsEditor} from 'components/PronounsEditor'
import {PronounShortForm} from 'components/PronounShortForm'
import {usePackedPronouns} from 'hooks/usePackedPronouns'
import {makeURL} from 'logic/helpers'
import {NextPage} from 'next'
import Link from 'next/link'
import {useEffect, useState} from 'react'

type EditPronounsProps = {
  empty?: undefined,
}

const EditPronouns: NextPage<EditPronounsProps> = (): JSX.Element => {
  const store = usePackedPronouns()
  const [isValid, setValid] = useState(false)
  const [viewURL, setViewURL] = useState(makeURL('v', store))
  useEffect(() => {
    setViewURL(makeURL('v', store))

    const observer = (): void => {
      setViewURL(makeURL('v', store))
    }
    store.addEventListener('changed', observer)
    return (): void => {
      store.removeEventListener('changed', observer)
    }
  }, [store, setViewURL])

  return (
    <Layout>
      <PronounShortForm store={store} />
      {isValid ? <Link href={viewURL}>Save & Share</Link> : <span>Invalide</span>}

      <PronounsEditor store={store} onValid={setValid} />
    </Layout>
  )
}

export default EditPronouns
