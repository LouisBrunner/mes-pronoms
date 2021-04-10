import {IPronounStore} from 'logic/types'
import {useCallback, useState} from 'react'
import {Copiable} from 'components/basic/Copiable'
import {useWatchPronouns} from 'hooks/useWatchPronouns'
import {Box, fade, Theme} from '@material-ui/core'
import styled from 'styled-components'

export type PronounShortFormProps = {
  store: IPronounStore,
}

const ShortFrom = styled(Box)`
  ${({theme}: {theme: Theme}): string => {
    return `
      background-color: ${fade(theme.palette.common.white, 0.15)};
      &:hover {
        background-color: ${fade(theme.palette.common.white, 0.25)};
      }
    `
  }}
`

export const PronounShortForm = ({store}: PronounShortFormProps): JSX.Element | null => {
  const [shortForm, setShortForm] = useState(store.shortForm())

  useWatchPronouns({
    store,
    initial: true,
    observer: useCallback(() => {
      setShortForm(store.shortForm())
    }, [store, setShortForm])
  })

  if (shortForm == undefined) {
    return null
  }

  return (
    <ShortFrom marginLeft={4} borderRadius={1} paddingX={1} paddingY={0.5}>
      <Copiable>{shortForm}</Copiable>
    </ShortFrom>
  )
}
