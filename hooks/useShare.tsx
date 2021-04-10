import {Box, Button, Checkbox, fade, FormControlLabel, Popover, Theme} from '@material-ui/core'
import {Copiable} from 'components/basic/Copiable'
import {baseURL} from 'config'
import {makeURL} from 'logic/helpers'
import {IPronounStore} from 'logic/types'
import {NextRouter} from 'next/router'
import {ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'

export type useShareProps = {
  router: NextRouter,
  store: IPronounStore,
  tinyURL: boolean,
}

export type useShareState = {
  openSharing: (e: MouseEvent<HTMLButtonElement>) => void,
  sharing: JSX.Element | null,
  tinyURL: boolean,
}

const CopyURL = styled(Box)`
  ${({theme}: {theme: Theme}): string => {
    return `
      background-color: ${fade(theme.palette.primary.main, 0.15)};
      &:hover {
        background-color: ${fade(theme.palette.primary.main, 0.25)};
      }
    `
  }}
`

export const useShare = ({router, store, tinyURL: initialTinyURL}: useShareProps): useShareState => {
  const [tinyURL, setTinyURL] = useState(initialTinyURL)

  // catch the real value of compress once it's loaded
  useEffect(() => {
    setTinyURL(initialTinyURL)
  }, [setTinyURL, initialTinyURL])

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const openSharing = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(e.currentTarget)
  }, [setAnchorEl])

  const closeSharing = useCallback((): void => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const doShare = useCallback(async () => {
    await navigator.share({
      title: 'Mes Pronoms',
      text: 'Utilise cette référence quand tu dois utiliser des pronoms pour me désigner',
      url: baseURL + makeURL('v', store, {compress: tinyURL}),
    })
  }, [tinyURL, store])

  const sharing = useMemo(() => {
    const onTinyURLChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const newValue = e.target.checked
      setTinyURL(newValue)
      await router.replace(makeURL('v', store, {compress: newValue}), undefined, {shallow: true})
    }

    let content
    if (typeof navigator !== 'undefined' && navigator.share) {
      content = (
        <Button variant="contained" color="primary" onClick={doShare}>Partager</Button>
      )
    } else {
      content = (
        <CopyURL borderRadius={1} padding={1}>
          <Copiable>{baseURL + makeURL('v', store, {compress: tinyURL})}</Copiable>
        </CopyURL>
      )
    }

    return (
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeSharing}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box paddingX={2} paddingY={1}>
          {content}

          <Box marginTop={1}>
            <FormControlLabel
              control={<Checkbox onChange={onTinyURLChange} checked={tinyURL} />}
              label="URL compacte ?"
            />
          </Box>
        </Box>
      </Popover>
    )
  }, [anchorEl, closeSharing, setTinyURL, router, tinyURL, doShare, store])

  return {
    openSharing,
    tinyURL,
    sharing,
  }
}
