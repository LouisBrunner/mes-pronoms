import {Layout} from 'components/Layout'
import {useRouter} from 'next/router'
import {PronounsViewer} from 'components/PronounsViewer'
import {usePronouns} from 'hooks/usePronouns'
import {NextPage} from 'next'
import {isArray} from 'logic/utils'

type ViewPronounsProps = {
  empty?: undefined,
}

const ViewPronouns: NextPage<ViewPronounsProps> = (): JSX.Element | null => {
  const router = useRouter()
  let {pack} = router.query
  if (pack === undefined) {
    pack = null
  }
  const data = isArray(pack) ? pack.join('/') : pack
  const store = usePronouns(data)

  return (
    <Layout>
      <PronounsViewer store={store} />
    </Layout>
  )
}

export default ViewPronouns
