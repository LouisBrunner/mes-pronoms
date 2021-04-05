import {createGlobalStyle} from 'styled-components'
import Head from 'next/head'
import {pathPrefix} from 'config'
import {ReactNode} from 'react'
import Link from 'next/link'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Helvetica, Arial, sans-serif;
  }
`

export type LayoutProps = {
  children: ReactNode,
}

export const Layout = ({children}: LayoutProps): JSX.Element => {
  return (
    <>
      <GlobalStyle />

      <Head>
        <title>Mes Pronoms</title>
        <link rel="icon" href={`${pathPrefix}/favicon.ico`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${pathPrefix}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${pathPrefix}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${pathPrefix}/favicon-16x16.png`} />
        <link rel="manifest" href={`${pathPrefix}/site.webmanifest`} />
      </Head>

      <h2><Link href="/">Mes Pronoms</Link></h2>

      {children}
    </>
  )
}
