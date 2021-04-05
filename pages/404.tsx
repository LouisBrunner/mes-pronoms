import {Layout} from 'components/Layout'
import Link from 'next/link'

const Error404 = (): JSX.Element => {
  return (
    <Layout>
      <h4>Page introuvable</h4>
      <p>Vous pouvez retourner à <Link href="/">l&apos;accueil</Link></p>
    </Layout>
  )
}

export default Error404
