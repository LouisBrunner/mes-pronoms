import type { VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { buttonGroupVariants } from "@/components/ui/_variants.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { cn } from "@/logic/utils.ts";

function ButtonGroup({
	className,
	orientation,
	...props
}: React.ComponentProps<"fieldset"> &
	VariantProps<typeof buttonGroupVariants>) {
	return (
		<fieldset
			className={cn(buttonGroupVariants({ orientation }), className)}
			data-orientation={orientation}
			data-slot="button-group"
			{...props}
		/>
	);
}

function ButtonGroupText({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"div"> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot.Root : "div";

	return (
		<Comp
			className={cn(
				"flex items-center gap-2 rounded-md border bg-muted px-2.5 text-xs/relaxed font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

function ButtonGroupSeparator({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			className={cn(
				"relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
				className,
			)}
			data-slot="button-group-separator"
			orientation={orientation}
			{...props}
		/>
	);
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
