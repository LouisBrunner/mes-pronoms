import type * as React from "react";

import { cn } from "@/logic/utils.ts";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			className={cn(
				"flex field-sizing-content min-h-16 w-full resize-none rounded-md border border-input bg-input/30 px-2 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/50 aria-invalid:ring-2 aria-invalid:ring-destructive/40 md:text-xs/relaxed",
				className,
			)}
			data-slot="textarea"
			{...props}
		/>
	);
}

export { Textarea };
