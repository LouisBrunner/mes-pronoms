import {useCallback, useMemo} from 'react'

export type useSpeechSynthesisProps = {
  ipa: string,
  word: string,
}

export type useSpeechSynthesisState =
  {enabled: false} |
  {enabled: true, speak: () => void}

const hasSpeechSynthesis = typeof speechSynthesis !== 'undefined'

const pickVoice = (): SpeechSynthesisVoice => {
  const voices = speechSynthesis.getVoices()
  const selected = voices.filter((voice) => {
    return voice.localService && voice.lang.startsWith('fr-')
  })
  if (selected.length == 0) {
    return voices[0]
  }
  return selected[Math.floor(Math.random() * selected.length)]
}

export const useSpeechSynthesis = ({word, ipa}: useSpeechSynthesisProps): useSpeechSynthesisState => {
  const utterance = useMemo(() => {
    if (!hasSpeechSynthesis) {
      return undefined
    }

    const utterance = new SpeechSynthesisUtterance(
      `<?xml version="1.0"?>
<speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="fr-FR">
  <phoneme alphabet="ipa" ph="${ipa}">${word}</phoneme>
</speak>`,
    )
    const voice = pickVoice()
    utterance.lang = 'fr-FR'
    utterance.voice = voice
    utterance.rate = 0.95
    return utterance
  }, [word, ipa])

  const speak = useCallback(() => {
    if (!hasSpeechSynthesis) {
      return undefined
    }

    speechSynthesis.speak(utterance)
  }, [utterance])

  if (!hasSpeechSynthesis) {
    return {enabled: false}
  }
  return {
    enabled: true,
    speak,
  }
}
