import { HelpCircle } from "lucide-react";
import type { ReactNode } from "react";
import { SimpleTooltip } from "@/components/common/SimpleTooltip.tsx";
import { Speakable } from "@/components/common/Speakable.tsx";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import { type ChosenPronoun, fetchGrammar } from "@/logic/business.ts";
import { Examples } from "@/logic/grammar/examples.tsx";
import { getForms } from "@/logic/grammar/helpers.ts";
import type { PronounKind } from "@/logic/pronouns/index.ts";
import type { PronounSelections } from "@/logic/storage/store.ts";
import { cn } from "@/logic/utils.ts";

export type PronounCardProps = {
	pronoun: PronounKind;
	choice: ChosenPronoun | undefined;
	selections: PronounSelections;
	children?: ReactNode;
	showMissing?: boolean;
};

export const PronounCard = ({
	pronoun,
	choice,
	selections,
	children,
	showMissing,
}: PronounCardProps) => {
	const grammar = fetchGrammar(pronoun);

	return (
		<Card
			className={cn(pronoun === "FamilleModificateur" ? "md:col-span-2" : "")}
		>
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
					<PronounChoice
						choice={choice}
						pronoun={pronoun}
						selections={selections}
					/>
				)}
			</CardContent>
		</Card>
	);
};

type PronounChoiceProps = {
	pronoun: PronounKind;
	choice: ChosenPronoun;
	selections: PronounSelections;
};

const PronounChoice = ({ pronoun, choice, selections }: PronounChoiceProps) => {
	const [singular, plural] = getForms(pronoun, choice.word);
	const content = (
		<strong>
			{singular} / {plural}
		</strong>
	);
	return (
		<>
			<p className="mb-4">
				Il faut utiliser{" "}
				<Speakable ipa={choice.ipa} word={choice.word}>
					{content}
				</Speakable>
			</p>
			<section>
				<p>Exemples:</p>
				<Examples kind={pronoun} selections={selections} word={choice.word} />
			</section>
		</>
	);
};
