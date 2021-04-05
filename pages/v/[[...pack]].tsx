import {Layout} from 'components/Layout'
import {PronounShortForm} from 'components/PronounShortForm'
import {PronounsViewer} from 'components/PronounsViewer'
import {baseURL} from 'config'
import {usePackedPronouns} from 'hooks/usePackedPronouns'
import {makeURL} from 'logic/helpers'
import {NextPage} from 'next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {ChangeEvent, useCallback, useEffect, useState} from 'react'

type ViewPronounsProps = {
  empty?: undefined,
}

const ViewPronouns: NextPage<ViewPronounsProps> = (): JSX.Element => {
  const router = useRouter()
  const {store, compressed: compress} = usePackedPronouns()

  const [tinyURL, setTinyURL] = useState(compress)
  const onTinyURLChange = useCallback(async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const newValue = e.target.checked
    setTinyURL(newValue)
    await router.replace(makeURL('v', store, {compress: newValue}), undefined, {shallow: true})
  }, [setTinyURL, router, store])

  const doShare = useCallback(async () => {
    if (!navigator.share) {
      // TODO: show notification?
      console.error('could not share link')
    }
    await navigator.share({
      title: 'Mes Pronoms',
      text: 'Utilise cette référence quand tu dois utiliser des pronoms pour me désigner',
      url: baseURL + makeURL('v', store, {compress: tinyURL}),
    })
  }, [tinyURL, store])

  useEffect(() => {
    setTinyURL(compress)
  }, [setTinyURL, compress])

  return (
    <Layout>
      <PronounShortForm store={store} />
      <Link href={makeURL('e', store, {compress})}>Editer</Link>

      <button onClick={doShare}>Partager</button>
      <>
        <input id="tiny_url" type="checkbox" onChange={onTinyURLChange} checked={tinyURL} />
        <label htmlFor="tiny_url">URL compacte ?</label>
      </>

      <PronounsViewer store={store} />
    </Layout>
  )
}

export default ViewPronouns
