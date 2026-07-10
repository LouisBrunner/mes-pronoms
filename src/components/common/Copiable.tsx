import { Copy } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import { TooltipButton } from "@/components/common/TooltipButton.tsx";
import { cn } from "@/logic/utils.ts";

export interface CopiableProps {
	children: string;
	className?: string;
}

export const Copiable = ({ className, children }: CopiableProps) => {
	const toClipboard = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(children);
			toast.success("Copié dans le presse-papier");
		} catch (err) {
			toast.error("Erreur lors de la copie dans le presse-papier", {
				description: `${err}`,
			});
		}
	}, [children]);

	return (
		<section
			className={cn(
				"flex items-center rounded-md px-2 py-1 gap-1 min-w-20 md:min-w-48",
				className,
			)}
		>
			<p className="grow truncate">{children}</p>
			<TooltipButton
				onClick={toClipboard}
				size="icon"
				tooltip="Copier"
				variant="ghost"
			>
				<Copy className="size-4" />
			</TooltipButton>
		</section>
	);
};
