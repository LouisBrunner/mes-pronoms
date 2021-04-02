import React, {useState} from 'react'
import Head from 'next/head'
import PronounsManager from 'logic/PronounsManager'
import {IPronounsManager} from 'logic/IPronounsManager'
import PronounsViewer from 'components/PronounsViewer'
import {NextPage} from 'next'
import {pathPrefix} from 'config'

const useManager = (queryData: string | null): IPronounsManager => {
  const data = queryData !== null ? queryData : null
  const [manager] = useState<IPronounsManager>(() => new PronounsManager(data))
  return manager
}

interface Props {
  data: string | null,
}

const Home: NextPage<Props> = ({data}) => {
  const manager = useManager(data)

  return (
    <>
      <style jsx global>{`
        body {
          font-family: Helvetica, Arial, sans-serif;
        }
      `}</style>

      <Head>
        <title>Mes Pronoms</title>
        <link rel="icon" href={`${pathPrefix}favicon.ico`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${pathPrefix}apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${pathPrefix}favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${pathPrefix}favicon-16x16.png`} />
        <link rel="manifest" href={`${pathPrefix}site.webmanifest`} />
      </Head>

      <PronounsViewer manager={manager} />
    </>
  )
}

Home.getInitialProps = async ({query}): Promise<{data: string | null}> => {
  let data = null
  if (query && query.data) {
    if (query.data instanceof Array) {
      data = query.data[0]
    } else {
      data = query.data
    }
  }
  return {data}
}

export default Home
