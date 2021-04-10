import {Box, IconButton, Tooltip, Typography} from '@material-ui/core'
import {useCallback} from 'react'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'
import styled from 'styled-components'

export interface CopiableProps {
  children: string,
}

const BoundText = styled(Typography)`
  width: 150px;
`

export const Copiable = ({children}: CopiableProps): JSX.Element => {
  const toClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(children)
  }, [children])

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <BoundText noWrap>{children}</BoundText>
      </Box>
      <Box>
        <IconButton edge="end" size="small" onClick={toClipboard} color="inherit">
          <Tooltip arrow title="Copier">
            <FileCopyIcon fontSize="small" />
          </Tooltip>
        </IconButton>
      </Box>
    </Box>
  )
}
