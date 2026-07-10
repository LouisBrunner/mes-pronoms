import type { ComponentProps } from "react";
import { SimpleTooltip } from "@/components/common/SimpleTooltip.tsx";
import { Button } from "@/components/ui/button.tsx";

export type TooltipButtonProps = ComponentProps<typeof Button> &
	ComponentProps<typeof SimpleTooltip>;

export const TooltipButton = ({
	tooltip,
	side,
	...props
}: TooltipButtonProps) => (
	<SimpleTooltip side={side} tooltip={tooltip}>
		{props.disabled ? (
			<span className="inline-block w-fit cursor-not-allowed">
				<Button {...props} />
			</span>
		) : (
			<Button {...props} />
		)}
	</SimpleTooltip>
);
