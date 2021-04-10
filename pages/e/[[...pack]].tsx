import {Layout} from 'components/Layout'
import {PronounsEditor} from 'components/edit/PronounsEditor'
import {PronounShortForm} from 'components/view/PronounShortForm'
import {usePronounsFromQuery} from 'hooks/usePronounsFromQuery'
import {useWatchPronouns} from 'hooks/useWatchPronouns'
import {makeURL} from 'logic/helpers'
import {NextPage} from 'next'
import Link from 'next/link'
import {useCallback, useState} from 'react'
import {Box, Container, IconButton, Tooltip} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

type EditPronounsProps = {
  empty?: undefined,
}

const EditPronouns: NextPage<EditPronounsProps> = (): JSX.Element => {
  const {router, store, compressed: compress} = usePronounsFromQuery()
  const [isValid, setValid] = useState(true)
  const [viewURL, setViewURL] = useState(makeURL('v', store, {compress}))

  useWatchPronouns({
    store,
    initial: () => {
      setViewURL(makeURL('v', store, {compress}))
    },
    observer: useCallback(async () => {
      setViewURL(makeURL('v', store, {compress}))
      await router.replace(makeURL('e', store, {compress}), undefined, {shallow: true})
    }, [router, setViewURL, compress, store]),
  })

  return (
    <Layout menu={
      <>
        <PronounShortForm store={store} />

        <Box flexGrow={1} />

        <Link href={viewURL} passHref>
          <IconButton disabled={!isValid} color="inherit">
            <Tooltip arrow title={isValid ? 'Enregister/Partager' : 'Invalide'}>
              <SaveIcon />
            </Tooltip>
          </IconButton>
        </Link>
      </>
    }>

      <Box paddingTop={3} paddingBottom={3}>
        <Container maxWidth="lg">
          <PronounsEditor store={store} onValid={setValid} />
        </Container>
      </Box>
    </Layout>
  )
}

export default EditPronouns
