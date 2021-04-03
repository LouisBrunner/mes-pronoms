import Link from 'next/link'

const Error404 = (): JSX.Element => {
  return (
    <div>
      <h4>Page introuvable</h4>
      <p>Vous pouvez retourner à <Link href="/">l&apos;accueil</Link></p>
    </div>
  )
}

export default Error404
