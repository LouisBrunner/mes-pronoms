import {Box, Container, IconButton, Tooltip} from '@material-ui/core'
import {Layout} from 'components/Layout'
import {PronounShortForm} from 'components/view/PronounShortForm'
import {PronounsViewer} from 'components/view/PronounsViewer'
import {usePronounsFromQuery} from 'hooks/usePronounsFromQuery'
import {useWatchPronouns} from 'hooks/useWatchPronouns'
import {makeURL} from 'logic/helpers'
import {NextPage} from 'next'
import Link from 'next/link'
import {useCallback, useState} from 'react'
import CreateIcon from '@material-ui/icons/CreateRounded'
import ShareIcon from '@material-ui/icons/ShareOutlined'
import {useShare} from 'hooks/useShare'

type ViewPronounsProps = {
  empty?: undefined,
}

const ViewPronouns: NextPage<ViewPronounsProps> = (): JSX.Element => {
  const {router, store, compressed: compress} = usePronounsFromQuery()
  const {openSharing, sharing, tinyURL} = useShare({router, store, tinyURL: compress})
  const [editURL, setEditURL] = useState(makeURL('e', store, {compress: tinyURL}))

  useWatchPronouns({
    store,
    initial: true,
    observer: useCallback(() => {
      setEditURL(makeURL('e', store, {compress: tinyURL}))
    }, [store, tinyURL, setEditURL]),
  })

  return (
    <Layout title={store.shortForm()} menu={
      <>
        <PronounShortForm store={store} />

        <Box flexGrow={1} />

        <Link href={editURL} passHref>
          <IconButton color="inherit">
            <Tooltip arrow title="Éditer">
              <CreateIcon />
            </Tooltip>
          </IconButton>
        </Link>

        <IconButton color="inherit" onClick={openSharing}>
          <Tooltip arrow title="Partager">
            <ShareIcon />
          </Tooltip>
        </IconButton>
      </>
    }>
      {sharing}

      <Box paddingTop={3} paddingBottom={3}>
        <Container maxWidth="lg">
          <PronounsViewer store={store} />
        </Container>
      </Box>
    </Layout>
  )
}

export default ViewPronouns
