import { Volume2 } from "lucide-react";
import type { ReactNode } from "react";
import { TooltipButton } from "@/components/common/TooltipButton";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

export interface SpeakableProps {
	children: ReactNode;
	ipa: string;
	word: string;
}

export const Speakable = ({ ipa, word, children }: SpeakableProps) => {
	const speech = useSpeechSynthesis({ ipa, word });

	if (!speech.enabled) {
		return <>{children}</>;
	}

	return (
		<span className="inline-flex items-center gap-1">
			{children}
			<TooltipButton
				className="size-4"
				onClick={speech.speak}
				size="icon"
				tooltip="Écouter"
				variant="ghost"
			>
				<Volume2 className="size-4" />
			</TooltipButton>
		</span>
	);
};
