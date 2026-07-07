import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
	type FormValues,
	PronounChooserForm,
	schema,
} from "@/components/pronouns/form/PronounChooserForm";
import { usePronoun } from "@/hooks/usePronoun";
import { choosePronoun } from "@/logic/business";
import type { IPronounStore, PronounKind, PronounPick } from "@/logic/types";
import { PronounCard } from "../PronounCard";

const resolver = zodResolver(schema);

const transformToForm = (pick: PronounPick | undefined): FormValues => {
	return { choice: pick ?? "" };
};

const transformFromForm = (form: FormValues): PronounPick | undefined => {
	return form.choice === "" ? undefined : form.choice;
};

export interface PronounChooserProps {
	onValid: (valid: boolean) => void;
	pronoun: PronounKind;
	store: IPronounStore;
}

export const PronounChooser = ({
	store,
	pronoun,
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
		onValid(isValid);
	}, [isValid, onValid]);

	useEffect(() => {
		if (isValid) {
			store.set(pronoun, transformFromForm(values));
		}
	}, [store, pronoun, values, isValid]);

	return (
		<FormProvider {...form}>
			<PronounCard choice={choice} pronoun={pronoun}>
				<PronounChooserForm pronoun={pronoun} />
			</PronounCard>
		</FormProvider>
	);
};
