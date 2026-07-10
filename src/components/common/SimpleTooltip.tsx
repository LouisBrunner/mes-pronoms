import type { ComponentProps, ReactNode } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export type SimpleTooltipProps = {
	tooltip: string;
	side?: ComponentProps<typeof TooltipContent>["side"];
	children: ReactNode;
};

export const SimpleTooltip = ({
	tooltip,
	side,
	children,
}: SimpleTooltipProps) => (
	<Tooltip>
		<TooltipTrigger asChild>{children}</TooltipTrigger>
		<TooltipContent side={side}>{tooltip}</TooltipContent>
	</Tooltip>
);
