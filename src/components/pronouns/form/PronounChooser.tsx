import { useEffect } from "react";
import {
	FormProvider,
	type Resolver,
	type ResolverResult,
	useForm,
} from "react-hook-form";
import {
	type FormValues,
	PronounChooserForm,
} from "@/components/pronouns/form/PronounChooserForm.tsx";
import { PronounCard } from "@/components/pronouns/PronounCard.tsx";
import { usePronoun } from "@/hooks/usePronoun.ts";
import { choosePronoun } from "@/logic/business.ts";
import type { PronounKind } from "@/logic/pronouns/index.ts";
import type {
	IPronounStore,
	PronounSelections,
} from "@/logic/storage/store.ts";
import type { PronounPick } from "@/logic/storage/types.ts";

const resolver: Resolver<FormValues> = (values): ResolverResult<FormValues> => {
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

const transformToForm = (pick: PronounPick | undefined): FormValues => ({
	choice: pick ?? "",
});

const transformFromForm = (form: FormValues): PronounPick | undefined =>
	form.choice === "" ? undefined : form.choice;

export interface PronounChooserProps {
	onValid: (kind: PronounKind, valid: boolean) => void;
	pronoun: PronounKind;
	selections: PronounSelections;
	store: IPronounStore;
}

export const PronounChooser = ({
	store,
	pronoun,
	selections,
	onValid,
}: PronounChooserProps) => {
	const picked = usePronoun(store, pronoun);
	const choice = choosePronoun(pronoun, picked);

	const form = useForm<FormValues>({
		defaultValues: transformToForm(picked),
		mode: "all",
		resolver,
	});
	const {
		formState: { isValid },
		reset,
		watch,
	} = form;
	const values = watch();

	useEffect(() => {
		reset(transformToForm(picked));
	}, [reset, picked]);

	useEffect(() => {
		onValid(pronoun, isValid);
	}, [isValid, onValid, pronoun]);

	useEffect(() => {
		if (isValid) {
			store.set(pronoun, transformFromForm(values));
		}
	}, [store, pronoun, values, isValid]);

	return (
		<FormProvider {...form}>
			<PronounCard choice={choice} pronoun={pronoun} selections={selections}>
				<PronounChooserForm pronoun={pronoun} />
			</PronounCard>
		</FormProvider>
	);
};
