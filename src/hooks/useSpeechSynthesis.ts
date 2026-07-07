import { useCallback, useMemo } from "react";
import { toast } from "sonner";

export type useSpeechSynthesisProps = {
	ipa: string;
	word: string;
};

export type useSpeechSynthesisState =
	| { enabled: false }
	| { enabled: true; speak: () => void };

const hasSpeechSynthesis = typeof speechSynthesis !== "undefined";

const getVoices = (): SpeechSynthesisVoice[] => {
	const voices = speechSynthesis.getVoices();
	return voices.filter((voice) => {
		return voice.localService && voice.lang.startsWith("fr-");
	});
};

export const useSpeechSynthesis = ({
	word,
	ipa,
}: useSpeechSynthesisProps): useSpeechSynthesisState => {
	const speech = useMemo(() => {
		if (!hasSpeechSynthesis) {
			return undefined;
		}

		const utterance = new SpeechSynthesisUtterance(
			`<?xml version="1.0"?>
<speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="fr-FR">
  <phoneme alphabet="ipa" ph="${ipa}">${word}</phoneme>
</speak>`,
		);
		const voices = getVoices();
		if (voices.length === 0) {
			toast.error("Aucune voix française disponible pour la synthèse vocale.");
			return undefined;
		}
		return { utterance, voices };
	}, [word, ipa]);

	const speak = useCallback(() => {
		if (!speech) {
			return undefined;
		}
		const utterance = new SpeechSynthesisUtterance(speech.utterance.text);
		utterance.lang = "fr-FR";
		utterance.rate = 0.9 + (Math.random() - 0.5) * 0.3;
		utterance.voice =
			speech.voices[Math.floor(Math.random() * speech.voices.length)];
		speechSynthesis.speak(utterance);
	}, [speech]);

	if (!hasSpeechSynthesis) {
		return { enabled: false };
	}
	return {
		enabled: true,
		speak,
	};
};
