"use client";

import { Command as CommandPrimitive, defaultFilter } from "cmdk";
import { ChevronDownIcon } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";
import { normalizeText } from "@/components/ui/_helpers.tsx";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
} from "@/components/ui/input-group.tsx";
import { cn } from "@/logic/utils.ts";

const scoreMatch = (value: string, search: string): number =>
	defaultFilter(normalizeText(value), normalizeText(search));

type ComboboxContextValue<T> = {
	anchorId: string;
	itemToStringLabel: (item: T) => string;
	items: T[];
	onFocus: () => void;
	onBlur?: () => void;
	onInputValueChange: (value: string) => void;
	open: boolean;
	openList: () => void;
	searchQuery: string;
	selectItem: (item: T | null) => void;
	selectedLabel: string | null;
	toggleOpen: () => void;
	value: string;
};

const ComboboxContext = createContext<ComboboxContextValue<never> | null>(null);

function useComboboxContext<T>(): ComboboxContextValue<T> {
	const context = useContext(ComboboxContext);
	if (!context) {
		throw new Error("Combobox subcomponents must be used within <Combobox>");
	}
	return context as unknown as ComboboxContextValue<T>;
}

export type ComboboxProps<T> = {
	"aria-invalid"?: boolean;
	children: ReactNode;
	itemToStringLabel: (item: T) => string;
	items: T[];
	name?: string;
	onInputValueChange: (value: string) => void;
	onValueChange: (value: T | null) => void;
	value: T | null;
	onBlur?: () => void;
};

function Combobox<T>({
	"aria-invalid": ariaInvalid,
	children,
	itemToStringLabel,
	items,
	onInputValueChange,
	onValueChange,
	value,
	onBlur,
}: ComboboxProps<T>) {
	const anchorId = useId();
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState(() =>
		value ? itemToStringLabel(value) : "",
	);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		setInputValue(value ? itemToStringLabel(value) : "");
	}, [value, itemToStringLabel]);

	const handleInputValueChange = useCallback(
		(next: string) => {
			setInputValue(next);
			setSearchQuery(next);
			setOpen(true);
			onInputValueChange(next);
		},
		[onInputValueChange],
	);

	const selectItem = useCallback(
		(item: T | null) => {
			setInputValue(item ? itemToStringLabel(item) : "");
			setOpen(false);
			onValueChange(item);
		},
		[itemToStringLabel, onValueChange],
	);

	const openList = useCallback(() => {
		setSearchQuery("");
		setOpen(true);
	}, []);

	const toggleOpen = useCallback(() => {
		if (open) {
			setOpen(false);
		} else {
			openList();
		}
	}, [open, openList]);

	const handleFocus = useCallback(() => {
		if (!open) {
			openList();
		}
	}, [open, openList]);

	const contextValue = useMemo<ComboboxContextValue<T>>(
		() => ({
			anchorId,
			items,
			itemToStringLabel,
			onBlur,
			onFocus: handleFocus,
			onInputValueChange: handleInputValueChange,
			open,
			openList,
			searchQuery,
			selectedLabel: value ? itemToStringLabel(value) : null,
			selectItem,
			toggleOpen,
			value: inputValue,
		}),
		[
			anchorId,
			itemToStringLabel,
			items,
			handleFocus,
			handleInputValueChange,
			onBlur,
			open,
			openList,
			searchQuery,
			selectItem,
			value,
			toggleOpen,
			inputValue,
		],
	);

	return (
		<ComboboxContext.Provider
			value={contextValue as unknown as ComboboxContextValue<never>}
		>
			<CommandPrimitive
				aria-invalid={ariaInvalid}
				data-slot="combobox"
				shouldFilter={false}
			>
				<PopoverPrimitive.Root modal={false} onOpenChange={setOpen} open={open}>
					{children}
				</PopoverPrimitive.Root>
			</CommandPrimitive>
		</ComboboxContext.Provider>
	);
}

function ComboboxInput({
	className,
	id,
	placeholder,
}: {
	className?: string;
	id?: string;
	placeholder?: string;
}) {
	const {
		anchorId,
		onFocus,
		onBlur,
		onInputValueChange,
		open,
		toggleOpen,
		value,
	} = useComboboxContext();
	return (
		<PopoverPrimitive.Anchor asChild>
			<InputGroup
				className={cn("w-auto", className)}
				data-combobox-anchor={anchorId}
			>
				<CommandPrimitive.Input
					className="h-full flex-1 rounded-none border-0 bg-transparent px-2 text-sm shadow-none ring-0 outline-none focus-visible:ring-0"
					data-slot="input-group-control"
					id={id}
					onBlur={onBlur}
					onFocus={onFocus}
					onValueChange={onInputValueChange}
					placeholder={placeholder}
					value={value}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						aria-label={open ? "Fermer la liste" : "Ouvrir la liste"}
						onClick={toggleOpen}
						size="icon-xs"
						tabIndex={-1}
						variant="ghost"
					>
						<ChevronDownIcon
							className={cn("transition-transform", open && "rotate-180")}
						/>
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</PopoverPrimitive.Anchor>
	);
}

const isInsideAnchor = (
	target: EventTarget | null,
	anchorId: string,
): boolean =>
	target instanceof Element &&
	Boolean(target.closest(`[data-combobox-anchor="${anchorId}"]`));

function ComboboxContent({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	const { anchorId } = useComboboxContext();

	const preventIfInside = useCallback(
		(event: Event) => {
			if (isInsideAnchor(event.target, anchorId)) {
				event.preventDefault();
			}
		},
		[anchorId],
	);

	const alwaysPrevent = useCallback(
		(event: Event) => event.preventDefault(),
		[],
	);

	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				align="start"
				className={cn(
					"z-50 w-(--radix-popover-trigger-width) origin-(--radix-popover-content-transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
					className,
				)}
				data-slot="combobox-content"
				onFocusOutside={preventIfInside}
				onInteractOutside={preventIfInside}
				onOpenAutoFocus={alwaysPrevent}
				onPointerDownOutside={preventIfInside}
				sideOffset={6}
			>
				<CommandPrimitive.List
					className="no-scrollbar max-h-72 scroll-py-1 overflow-y-auto overscroll-contain p-1 [&>[cmdk-list-sizer]]:flex [&>[cmdk-list-sizer]]:flex-col"
					data-slot="combobox-list"
				>
					{children}
				</CommandPrimitive.List>
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	);
}

function ComboboxEmpty<T>({ children }: { children: ReactNode }) {
	const { items, itemToStringLabel, searchQuery } = useComboboxContext<T>();
	const hasMatch =
		!searchQuery ||
		items.some((item) => scoreMatch(itemToStringLabel(item), searchQuery) > 0);
	if (hasMatch) {
		return null;
	}
	return (
		<div
			className="flex w-full justify-center py-2 text-center text-xs/relaxed text-muted-foreground"
			data-slot="combobox-empty"
		>
			{children}
		</div>
	);
}

function ComboboxList<T>({ children }: { children: (item: T) => ReactNode }) {
	const { items } = useComboboxContext<T>();
	return <>{items.map(children)}</>;
}

function ComboboxItem<T>({
	children,
	className,
	order,
	value: item,
}: {
	children: ReactNode;
	className?: string;
	/** Visual position among siblings (via CSS `order`), without changing
	 * where this item sits in the underlying array/DOM. Lets a write-in
	 * entry appear in its sorted spot while typing without physically
	 * moving DOM nodes on every keystroke (which is expensive and can
	 * confuse the popover's auto-positioning). */
	order?: number;
	value: T;
}) {
	const { itemToStringLabel, searchQuery, selectedLabel, selectItem } =
		useComboboxContext<T>();
	const label = itemToStringLabel(item);
	const isCurrentValue = selectedLabel === label;
	const matches = !searchQuery || scoreMatch(label, searchQuery) > 0;
	const select = useCallback(() => {
		selectItem(item);
	}, [item, selectItem]);
	return (
		<CommandPrimitive.Item
			className={cn(
				"relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-md px-2 py-1 text-xs/relaxed outline-hidden select-none transition-colors duration-150 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
				isCurrentValue && "not-data-[selected=true]:bg-primary/10",
				className,
			)}
			data-slot="combobox-item"
			disabled={!matches}
			hidden={!matches}
			onSelect={select}
			style={order === undefined ? undefined : { order }}
			value={label}
		>
			{children}
		</CommandPrimitive.Item>
	);
}

export {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
};
