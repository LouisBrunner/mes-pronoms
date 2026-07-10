import { Volume2 } from "lucide-react";
import { type ReactNode, useCallback } from "react";
import { TooltipButton } from "@/components/common/TooltipButton.tsx";
import { useSpeak } from "@/hooks/useSpeak.ts";
import { cn } from "@/logic/utils.ts";

export interface SpeakableProps {
	children: ReactNode;
	className?: string;
	ipa: string | string[] | undefined;
	word: string | string[];
}

export const Speakable = ({
	className,
	ipa,
	word,
	children,
}: SpeakableProps) => {
	const speak = useSpeak();
	const onClick = useCallback(() => speak?.({ ipa, word }), [speak, ipa, word]);

	if (!speak) {
		return <>{children}</>;
	}

	return (
		<TooltipButton
			className={cn("inline-flex items-center gap-1.5 p-1 -ml-1", className)}
			onClick={onClick}
			tooltip="Écouter"
			variant="ghost"
		>
			{children}
			<Volume2 className="size-4" />
		</TooltipButton>
	);
};
