import {useSpeechSynthesis} from 'hooks/useSpeechSynthesis'
import {ReactNode} from 'react'

export interface SpeakableProps {
  word: string;
  ipa: string;
  children: ReactNode,
}

export const Speakable = ({ipa, word, children}: SpeakableProps): JSX.Element => {
  const speech = useSpeechSynthesis({ipa, word})

  if (!speech.enabled) {
    return <>{children}</>
  }

  return (
    <span>
      {children} <button onClick={speech.speak}>Lire</button>
    </span>
  )
}
