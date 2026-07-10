import { useCallback, useId, useMemo, useState } from "react";
import {
	type Resolver,
	type ResolverResult,
	useController,
} from "react-hook-form";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	normalizeText,
} from "@/components/ui/combobox.tsx";
import { Field, FieldError } from "@/components/ui/field.tsx";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item.tsx";
import {
	composePronouns,
	getPronounSingular,
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
			word: string | string[];
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
			return `${option.type}-${option.value}`;
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

const renderOption = (item: Option) => (
	<ComboboxItem key={optionID(item)} value={item}>
		{item.type === "pre" ? (
			formatOption(item)
		) : (
			<Item className="p-0 flex flex-col items-start gap-0" size="xs">
				<ItemTitle>{item.value}</ItemTitle>
				<ItemDescription className="font-extralight">Ajouté</ItemDescription>
			</Item>
		)}
	</ComboboxItem>
);

export type FormValues = {
	choice: PronounPick | "";
};

export const resolver: Resolver<FormValues> = (
	values,
): ResolverResult<FormValues> => {
	if (values.choice === "") {
		return {
			errors: {
				choice: {
					message: "Vous devez renseigner un pronom",
					type: "required",
				},
			},
			values: {},
		};
	}
	return { errors: {}, values };
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
	const [inputValue, setInputValue] = useState("");

	const base = Options[pronoun];
	const hasExactMatch = useCallback(
		(query: string): boolean =>
			base.some((opt) => isExactMatch(formatOption(opt), query)),
		[base],
	);
	const items: Option[] = useMemo(
		() =>
			inputValue && !hasExactMatch(inputValue)
				? [...base, { type: "write_in", value: inputValue } as Option].toSorted(
						(a, b) => formatOption(a).localeCompare(formatOption(b)),
					)
				: base,
		[inputValue, base, hasExactMatch],
	);
	const option = useMemo(() => choiceToOption(value, base), [value, base]);

	const setInput = useCallback(
		(input: string): void => {
			setInputValue(input);
			if (!input) {
				onChange(optionToChoice(null));
				onBlur();
			} else if (hasExactMatch(input)) {
				onBlur();
			} else {
				onChange(optionToChoice({ type: "write_in", value: input }));
			}
		},
		[hasExactMatch, onChange, onBlur],
	);
	const setChoice = useCallback(
		(opt: Option | null): void => {
			setInputValue(opt ? formatOption(opt) : "");
			onChange({ target: { value: optionToChoice(opt) } });
		},
		[onChange],
	);

	return (
		<Field data-invalid={hasError}>
			<Combobox
				aria-invalid={hasError}
				items={items}
				itemToStringLabel={formatOption}
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
