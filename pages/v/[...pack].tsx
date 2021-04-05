import {Layout} from 'components/Layout'
import {PronounShortForm} from 'components/PronounShortForm'
import {PronounsViewer} from 'components/PronounsViewer'
import {baseURL} from 'config'
import {usePackedPronouns} from 'hooks/usePackedPronouns'
import {makeURL} from 'logic/helpers'
import {NextPage} from 'next'
import Link from 'next/link'
import {ChangeEvent, useCallback, useState} from 'react'

type ViewPronounsProps = {
  empty?: undefined,
}

const ViewPronouns: NextPage<ViewPronounsProps> = (): JSX.Element => {
  const store = usePackedPronouns()

  const [tinyURL, setTinyURL] = useState(false)
  const onTinyURLChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setTinyURL(e.target.checked)
  }, [setTinyURL])

  const doShare = useCallback(() => {
    if (!navigator.share) {
      console.error('could not share link')
    }
    navigator.share({
      title: 'Mes Pronoms',
      text: 'Utilise cette référence quand tu dois utiliser des pronoms pour me désigner',
      url: baseURL + makeURL('v', store, {compress: tinyURL}),
    })
  }, [tinyURL])

  return (
    <Layout>
      <PronounShortForm store={store} />
      <Link href={makeURL('e', store, {compress: false})}>Edit</Link>

      <button onClick={doShare}>Share</button>
      <>
        <input id="tiny_url" type="checkbox" onChange={onTinyURLChange} checked={tinyURL} />
        <label htmlFor="tiny_url">Small URL?</label>
      </>

      <PronounsViewer store={store} />
    </Layout>
  )
}

export default ViewPronouns
