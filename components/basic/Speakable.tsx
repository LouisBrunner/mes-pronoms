import {IconButton, Tooltip} from '@material-ui/core'
import {useSpeechSynthesis} from 'hooks/useSpeechSynthesis'
import {ReactNode} from 'react'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import styled from 'styled-components'

export interface SpeakableProps {
  word: string;
  ipa: string;
  children: ReactNode,
}

const Aligner = styled.span`
  ${(): string => {
    return `
      display: inline-flex;
      align-items: center;
    `
  }}
`

export const Speakable = ({ipa, word, children}: SpeakableProps): JSX.Element => {
  const speech = useSpeechSynthesis({ipa, word})

  if (!speech.enabled) {
    return <>{children}</>
  }

  return (
    <Aligner>
      {children}
      {' '}
      <IconButton edge="end" size="small" onClick={speech.speak} color="inherit">
        <Tooltip arrow title="Écouter">
          <VolumeUpIcon fontSize="small" />
        </Tooltip>
      </IconButton>
    </Aligner>
  )
}
