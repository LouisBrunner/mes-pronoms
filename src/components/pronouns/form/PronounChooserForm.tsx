import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useCallback, useId, useMemo, useState } from "react";
import { useController } from "react-hook-form";
import { z } from "zod";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Item, ItemDescription, ItemTitle } from "@/components/ui/item";
import { TABLE } from "@/logic/content/choices";
import { type PronounKind, PronounList, type PronounPick } from "@/logic/types";

type Option =
	| {
			type: "pre";
			id: number;
			word: string;
	  }
	| {
			type: "write_in";
			value: string;
	  };

const Options = ((): Record<PronounKind, Option[]> => {
	const options: Partial<Record<PronounKind, Option[]>> = {};
	for (const pronoun of PronounList) {
		options[pronoun] = TABLE.pronouns[pronoun].db
			.toSorted((a, b) => a.word.localeCompare(b.word))
			.map<Option>((entry) => {
				return { id: entry.id, type: "pre", word: entry.word };
			});
	}
	return options as Record<PronounKind, Option[]>;
})();

const formatOption = (option: Option) => {
	switch (option.type) {
		case "pre":
			return option.word;
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
			base.find((option) => {
				return option.type === "pre" && option.id === choice;
			}) ?? null
		);
	}
	return { type: "write_in", value: choice };
};

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

export const schema = z
	.object({
		choice: z.union([z.number(), z.string()]),
	})
	.refine((form) => form.choice !== "", {
		message: "Vous devez renseignez un pronom",
		path: ["choice"],
	});

export type FormValues = z.infer<typeof schema>;

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
	const hasError = isTouched && !!error;
	const [inputValue, setInputValue] = useState("");

	const base = Options[pronoun];
	const filter = ComboboxPrimitive.useFilter();
	const hasMatch = useCallback(
		(query: string): boolean => {
			return base.some((option) => {
				return filter.contains(option, query, formatOption);
			});
		},
		[base, filter],
	);
	const items: Option[] = useMemo(() => {
		return inputValue && !hasMatch(inputValue)
			? [...base, { type: "write_in", value: inputValue } as Option].toSorted(
					(a, b) => {
						return formatOption(a).localeCompare(formatOption(b));
					},
				)
			: base;
	}, [inputValue, base, hasMatch]);
	const option = useMemo(() => {
		return choiceToOption(value, base);
	}, [value, base]);

	const setInput = useCallback(
		(inputValue: string): void => {
			setInputValue(inputValue);
			if (inputValue && !hasMatch(inputValue)) {
				onChange(optionToChoice({ type: "write_in", value: inputValue }));
			} else {
				onBlur();
			}
		},
		[hasMatch, onChange, onBlur],
	);
	const setChoice = useCallback(
		(option: Option | null): void => {
			onChange({ target: { value: optionToChoice(option) } });
		},
		[onChange],
	);

	return (
		<Field
			className="flex-wrap"
			data-invalid={hasError}
			orientation="horizontal"
		>
			<FieldLabel htmlFor={choiceId}>Choix:</FieldLabel>
			<Combobox
				aria-invalid={hasError}
				autoHighlight
				items={items}
				itemToStringLabel={formatOption}
				{...register}
				onInputValueChange={setInput}
				onValueChange={setChoice}
				value={option}
			>
				<ComboboxInput id={choiceId} placeholder="Choisis un pronom" />
				<ComboboxContent>
					<ComboboxEmpty>Autre...</ComboboxEmpty>
					<ComboboxList>{renderOption}</ComboboxList>
				</ComboboxContent>
			</Combobox>
			{hasError ? <FieldError>{error?.message}</FieldError> : null}
		</Field>
	);
};
