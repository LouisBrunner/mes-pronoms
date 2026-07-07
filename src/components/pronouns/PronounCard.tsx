import { HelpCircle } from "lucide-react";
import type { ReactNode } from "react";
import { SimpleTooltip } from "@/components/common/SimpleTooltip";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type ChosenPronoun, fetchGrammar } from "@/logic/business";
import type { IPronounContent } from "@/logic/content/grammar";
import type { PronounKind } from "@/logic/types";
import { pluralize } from "@/logic/utils";
import { Speakable } from "../common/Speakable";

export type PronounCardProps = {
	pronoun: PronounKind;
	choice: ChosenPronoun | undefined;
	children?: ReactNode;
	showMissing?: boolean;
};

export const PronounCard = ({
	pronoun,
	choice,
	children,
	showMissing,
}: PronounCardProps) => {
	const grammar = fetchGrammar(pronoun);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{grammar.title}</CardTitle>
				<CardAction>
					<SimpleTooltip side="bottom" tooltip={grammar.description}>
						<HelpCircle className="size-4" />
					</SimpleTooltip>
				</CardAction>
			</CardHeader>
			<CardContent className="space-y-4">
				{children}

				{choice === undefined ? (
					showMissing ? (
						<p className="text-center">
							<strong>Non renseigné</strong>
						</p>
					) : null
				) : (
					<PronounChoice choice={choice} examples={grammar.examples} />
				)}
			</CardContent>
		</Card>
	);
};

type PronounChoiceProps = {
	choice: ChosenPronoun;
	examples: IPronounContent["examples"];
};

const PronounChoice = ({ choice, examples }: PronounChoiceProps) => {
	const pluralChoice = pluralize(choice.word);
	return (
		<>
			<p className="mb-4">
				Il faut utiliser{" "}
				{choice.ipa ? (
					<Speakable ipa={choice.ipa} word={choice.word}>
						<strong>
							{choice.word}/{pluralChoice}
						</strong>
					</Speakable>
				) : (
					<strong>
						{choice.word}/{pluralChoice}
					</strong>
				)}
			</p>
			<section>
				<p>Exemples:</p>
				<ul className="list-inside list-disc ps-2">
					<li>
						<em>Singulier</em>: {examples.singularWith(choice.word)}
					</li>
					<li>
						<em>Pluriel</em>: {examples.pluralWith(pluralChoice)}
					</li>
				</ul>
			</section>
		</>
	);
};
