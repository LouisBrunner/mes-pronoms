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
  const store = usePronouns(isArray(pack) ? pack.join('/') : pack)

  return (
    <Layout>
      <PronounsViewer store={store} />
    </Layout>
  )
}

export default ViewPronouns
