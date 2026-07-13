import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useController } from "react-hook-form";
import { normalizeText } from "@/components/ui/_helpers.tsx";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox.tsx";
import { Field, FieldError } from "@/components/ui/field.tsx";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item.tsx";
import {
	composePronouns,
	getPronounSingular,
	type WordForm,
} from "@/logic/pronouns/_helpers.ts";
import {
	PRONOUNS,
	type PronounKind,
	PronounList,
} from "@/logic/pronouns/index.ts";
import type { PronounPick } from "@/logic/storage/types.ts";

type Option =
	| {
			type: "pre";
			id: number;
			word: WordForm;
	  }
	| {
			type: "write_in";
			value: string;
	  };

const Options = ((): Record<PronounKind, Option[]> => {
	const options: Partial<Record<PronounKind, Option[]>> = {};
	for (const pronoun of PronounList) {
		options[pronoun] = PRONOUNS[pronoun].db
			.toSorted((a, b) =>
				getPronounSingular(a.word).localeCompare(getPronounSingular(b.word)),
			)
			.map<Option>((entry) => ({
				id: entry.id,
				type: "pre",
				word: entry.word,
			}));
	}
	return options as Record<PronounKind, Option[]>;
})();

const formatOption = (option: Option) => {
	switch (option.type) {
		case "pre":
			return composePronouns(option.word);
		case "write_in":
			return option.value;
	}
};

const optionID = (option: Option) => {
	switch (option.type) {
		case "pre":
			return `${option.type}-${option.id}`;
		case "write_in":
			return option.type;
	}
};

const optionToChoice = (option: Option | null): PronounPick | "" => {
	if (!option) {
		return "";
	}
	return option.type === "pre" ? option.id : option.value;
};

const choiceToOption = (
	choice: PronounPick | "",
	base: Option[],
): Option | null => {
	if (choice === "") {
		return null;
	}
	if (typeof choice === "number") {
		return (
			base.find((option) => option.type === "pre" && option.id === choice) ??
			null
		);
	}
	return { type: "write_in", value: choice };
};

const isExactMatch = (label: string, query: string): boolean =>
	normalizeText(label).toLowerCase() === normalizeText(query).toLowerCase();

export type FormValues = {
	choice: PronounPick | "";
};

export type PronounChooserFormProps = {
	pronoun: PronounKind;
};

export const PronounChooserForm = ({ pronoun }: PronounChooserFormProps) => {
	const {
		field: { value, onBlur, onChange, ...register },
		fieldState: { isTouched, error },
	} = useController<FormValues>({
		name: "choice",
	});
	const choiceId = useId();
	const hasError = isTouched && Boolean(error);

	const base = Options[pronoun];
	const option = useMemo(() => choiceToOption(value, base), [value, base]);
	const [inputValue, setInputValue] = useState(() =>
		option ? formatOption(option) : "",
	);
	// Keep the local input text in sync with the committed value — this also
	// covers the initial mount, so an existing write-in selection (loaded
	// from the URL) shows up in the options list right away instead of only
	// after the user edits the field.
	useEffect(() => {
		setInputValue(option ? formatOption(option) : "");
	}, [option]);

	const findExactMatch = useCallback(
		(query: string): Option | undefined =>
			base.find((opt) => isExactMatch(formatOption(opt), query)),
		[base],
	);
	const hasExactMatch = useCallback(
		(query: string): boolean => findExactMatch(query) !== undefined,
		[findExactMatch],
	);
	// The write-in entry always stays appended last in the array/DOM — moving
	// it around physically on every keystroke is expensive and can confuse
	// the popover's auto-positioning. Its correct sorted spot is instead
	// applied visually via CSS `order` in `orderOf` below.
	const items: Option[] = useMemo(
		() =>
			inputValue && !hasExactMatch(inputValue)
				? [...base, { type: "write_in", value: inputValue } as Option]
				: base,
		[inputValue, base, hasExactMatch],
	);
	const orderOf = useCallback(
		(item: Option): number => {
			if (item.type === "pre") {
				return base.indexOf(item) * 2;
			}
			const insertAt = base.findIndex(
				(opt) => formatOption(opt).localeCompare(item.value) > 0,
			);
			return (insertAt === -1 ? base.length : insertAt) * 2 - 1;
		},
		[base],
	);
	const renderOption = useCallback(
		(item: Option) => (
			<ComboboxItem key={optionID(item)} order={orderOf(item)} value={item}>
				{item.type === "pre" ? (
					formatOption(item)
				) : (
					<Item className="p-0 flex flex-col items-start gap-0" size="xs">
						<ItemTitle>{item.value}</ItemTitle>
						<ItemDescription className="font-extralight">
							Ajouté
						</ItemDescription>
					</Item>
				)}
			</ComboboxItem>
		),
		[orderOf],
	);

	const setInput = useCallback(
		(input: string): void => {
			setInputValue(input);
			if (!input) {
				onChange(optionToChoice(null));
			}
		},
		[onChange],
	);
	const setChoice = useCallback(
		(opt: Option | null): void => {
			setInputValue(opt ? formatOption(opt) : "");
			onChange({ target: { value: optionToChoice(opt) } });
		},
		[onChange],
	);
	const handleBlur = useCallback((): void => {
		if (inputValue) {
			const match = findExactMatch(inputValue);
			onChange(
				optionToChoice(match ?? { type: "write_in", value: inputValue }),
			);
		}
		onBlur();
	}, [inputValue, findExactMatch, onChange, onBlur]);

	return (
		<Field data-invalid={hasError}>
			<Combobox
				aria-invalid={hasError}
				items={items}
				itemToStringLabel={formatOption}
				onBlur={handleBlur}
				{...register}
				onInputValueChange={setInput}
				onValueChange={setChoice}
				value={option}
			>
				<ComboboxInput id={choiceId} placeholder="Choisissez un pronom" />
				<ComboboxContent>
					<ComboboxEmpty>Autre...</ComboboxEmpty>
					<ComboboxList>{renderOption}</ComboboxList>
				</ComboboxContent>
			</Combobox>
			{hasError ? <FieldError>{error?.message}</FieldError> : null}
		</Field>
	);
};
