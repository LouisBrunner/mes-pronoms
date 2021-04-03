import {NextPage} from 'next'
import Link from 'next/link'
import {Layout} from 'components/Layout'
import {packStore} from 'logic/storage/packing'
import {IEL} from 'logic/content/iel'

type HomeProps = {
  nothing?: undefined,
}

const Home: NextPage<HomeProps> = (): JSX.Element => {
  return (
    <Layout>
      <p>Bienvenue sur MesPronoms!</p>
      <p>Ce site vous permet de facilement montrer et expliquer les pronoms que vous souhaitez utiliser.</p>
      <p>La langue française est extrêmement genrée et j&apos;espère que cet outil vous aidera à retenir les tournures de phrases à utiliser avec des néo-pronoms.</p>
      <p>Voici un exemple d&apos;utilisation: <Link href={`/v/${packStore(IEL, {compress: false})}`}>cliquer ici</Link></p>
    </Layout>
  )
}

export default Home
