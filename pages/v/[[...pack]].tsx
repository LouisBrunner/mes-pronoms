import {Layout} from 'components/Layout'
import {PronounShortForm} from 'components/view/PronounShortForm'
import {PronounsViewer} from 'components/view/PronounsViewer'
import {baseURL} from 'config'
import {usePronounsFromQuery} from 'hooks/usePronounsFromQuery'
import {useWatchPronouns} from 'hooks/useWatchPronouns'
import {makeURL} from 'logic/helpers'
import {NextPage} from 'next'
import Link from 'next/link'
import {ChangeEvent, useCallback, useEffect, useState} from 'react'

type ViewPronounsProps = {
  empty?: undefined,
}

const ViewPronouns: NextPage<ViewPronounsProps> = (): JSX.Element => {
  const {router, store, compressed: compress} = usePronounsFromQuery()
  const [tinyURL, setTinyURL] = useState(compress)
  const [editURL, setEditURL] = useState(makeURL('e', store, {compress: tinyURL}))

  const onTinyURLChange = useCallback(async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const newValue = e.target.checked
    setTinyURL(newValue)
    await router.replace(makeURL('v', store, {compress: newValue}), undefined, {shallow: true})
  }, [setTinyURL, router, store])

  const doShare = useCallback(async () => {
    if (!navigator.share) {
      // TODO: fallback mechanism
      console.error('could not share link')
      return
    }
    await navigator.share({
      title: 'Mes Pronoms',
      text: 'Utilise cette référence quand tu dois utiliser des pronoms pour me désigner',
      url: baseURL + makeURL('v', store, {compress: tinyURL}),
    })
  }, [tinyURL, store])

  // catch the real value of compress once it's loaded
  useEffect(() => {
    setTinyURL(compress)
  }, [setTinyURL, compress])

  useWatchPronouns({
    store,
    initial: true,
    observer: useCallback(() => {
      setEditURL(makeURL('e', store, {compress: tinyURL}))
    }, [store, tinyURL, setEditURL]),
  })

  return (
    <Layout>
      <PronounShortForm store={store} />
      <Link href={editURL}>Editer</Link>

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
