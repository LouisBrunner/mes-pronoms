import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useEffectEvent,
	useRef,
	useState,
} from "react";
import { toast } from "sonner";
import { debugLog } from "@/config.ts";

export type SpeakParams = {
	ipa?: string | string[];
	word: string | string[];
};

export type SpeakFn = (params: SpeakParams) => void;

export const hasSpeechSynthesis = typeof speechSynthesis !== "undefined";

const allowList = ["Amelie", "Thomas"];

export const getFrenchVoices = (): SpeechSynthesisVoice[] =>
	speechSynthesis.getVoices().filter((voice) => {
		const last = voice.voiceURI.split(".").at(-1);
		return (
			voice.lang.startsWith("fr-") &&
			(allowList.includes(last ?? "") || !voice.localService)
		);
	});

export const SpeakContext = createContext<SpeakFn | null | undefined>(
	undefined,
);

export const useSpeak = (): SpeakFn | null => {
	const context = useContext(SpeakContext);
	if (context === undefined) {
		throw new Error("useSpeak must be used within a SpeakProvider");
	}
	return context;
};

export const useSynthesis = () => {
	const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
	const voicesChanged = useEffectEvent(() => {
		setVoices(getFrenchVoices());
	});
	const counter = useRef(0);

	useEffect(() => {
		if (!hasSpeechSynthesis) {
			return;
		}
		voicesChanged();
		speechSynthesis.addEventListener("voiceschanged", voicesChanged);
		return () => {
			speechSynthesis.removeEventListener("voiceschanged", voicesChanged);
		};
	}, [hasSpeechSynthesis]);

	const speak = useCallback<SpeakFn>(
		({ ipa, word }) => {
			if (voices.length === 0) {
				toast.error(
					"Aucune voix française disponible pour la synthèse vocale.",
				);
				return;
			}

			const voice = voices[counter.current];
			if (!voice) {
				toast.error(
					"Aucune voix française disponible pour la synthèse vocale.",
				);
				return;
			}
			counter.current = (counter.current + 1) % voices.length;

			const utterance = new SpeechSynthesisUtterance(
				makeSSML(ipa, word, voice),
			);
			utterance.lang = voice.lang;
			utterance.rate = 0.9 + (Math.random() - 0.5) * 0.3;
			utterance.voice = voice;

			debugLog(
				`Speaking "${word}" with voice "${voice.name}" (${voice.voiceURI}) and IPA "${ipa}" at ${utterance.rate}: ${utterance.text}`,
			);

			if (speechSynthesis.pending) {
				speechSynthesis.cancel();
			}
			speechSynthesis.speak(utterance);
		},
		[voices],
	);

	return speak;
};

const makePause = (l: number) => `<break time="${l}s"/>`;

const makePhoneme = (ipa: string, word: string): string =>
	`<phoneme alphabet="ipa" ph="${ipa}">${word}</phoneme>`;

// FIXME: not sure why this is an issue or on which platform
const patchIPA = (ipa: string): string => {
	let patched = ipa;
	if (patched.endsWith("t")) {
		patched += ":";
		// patched += "ø.";
	}
	patched = patched.replace(/ʁ/g, "r");
	patched = patched.replace(/ɔ̃/g, "ɔn");
	patched = patched.replace(/ɑ̃/g, "an");
	patched = patched.replace(/ɛ̃/g, "ɛn");
	patched = patched.replace(/œ̃/g, "œn");
	return patched;
};

const makeSSML = (
	ipa: string | string[] | undefined,
	word: string | string[],
	voice: SpeechSynthesisVoice,
): string => {
	if (typeof word !== typeof ipa && ipa !== undefined) {
		throw new Error("Word and IPA must be of the same type");
	}

	const words = Array.isArray(word) ? word : [word];
	const ipas = Array.isArray(ipa) ? ipa : ipa === undefined ? undefined : [ipa];

	const content = words
		.map((w, i) => {
			const p = ipas ? ipas[i] : undefined;
			if (!p) {
				return w;
			}
			const ps = p.split(" / ");
			return ps.map((pi) => makePhoneme(patchIPA(pi), w)).join(makePause(0.05));
		})
		.join(makePause(0.3));

	return `<?xml version="1.0"?>
<speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${voice.lang}">
  ${content}
</speak>`;
};
