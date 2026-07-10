/** biome-ignore-all lint/suspicious/noConsole: debugging page */
import { ChevronDownIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Speakable } from "@/components/common/Speakable.tsx";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import { isDev } from "@/config.ts";
import { Examples } from "@/logic/grammar/examples.tsx";
import { IEL } from "@/logic/presets/iel.ts";
import {
	composePronouns,
	getPronounSingular,
	type IPronounDBEntry,
} from "@/logic/pronouns/_helpers.ts";
import {
	PRONOUNS,
	type PronounKind,
	PronounsList,
} from "@/logic/pronouns/index.ts";
import { cn } from "@/logic/utils.ts";

const testDefaults = IEL.pronouns;

const cellClasses = "border-2 border-accent/70 p-1";

const TestKindChoice = ({
	kind,
	choice,
}: {
	kind: PronounKind;
	choice: IPronounDBEntry;
}) => (
	<tr>
		<td className={cn(cellClasses, "text-center")}>
			<span className="font-mono p-1 py-0.5 rounded bg-accent/60">
				{choice.id}
			</span>
		</td>
		<td className={cn(cellClasses, "text-center font-bold underline")}>
			<a
				href={`https://fr.wiktionary.org/wiki/${getPronounSingular(choice.word)}#Français`}
				rel="noopener noreferrer"
				target="_blank"
			>
				{composePronouns(choice.word)}
			</a>
		</td>
		<td className={cn(cellClasses, "text-center")}>
			<Speakable className="underline" ipa={choice.ipa} word={choice.word}>
				Speak
			</Speakable>
		</td>
		<td className={cn(cellClasses)}>
			<Examples kind={kind} selections={testDefaults} word={choice.word} />
		</td>
	</tr>
);

const TestKind = ({ kind }: { kind: PronounKind }) => {
	const choices = PRONOUNS[kind].db;

	useEffect(() => {
		const seen = new Set();
		for (const choice of choices) {
			if (seen.has(choice.id)) {
				console.error(`Duplicate ID ${choice.id} found in ${kind} pronouns.`);
			}
			seen.add(choice.id);
			if (seen.has(choice.word)) {
				console.error(
					`Duplicate word ${choice.word} found in ${kind} pronouns.`,
				);
			}
		}
	}, [choices]);

	return (
		<Collapsible className="bg-primary/20 rounded">
			<CollapsibleTrigger className="group flex items-center gap-2 p-3 w-full">
				<ChevronDownIcon className="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
				{kind}
			</CollapsibleTrigger>
			<CollapsibleContent className="p-3 pt-0 space-y-3">
				<hr />
				<table className="table-auto w-full">
					<tbody>
						{choices
							.toSorted((a, b) => a.id - b.id)
							.map((choice) => (
								<TestKindChoice choice={choice} key={choice.id} kind={kind} />
							))}
					</tbody>
				</table>
			</CollapsibleContent>
		</Collapsible>
	);
};

export const Test = () => {
	const navigate = useNavigate();
	if (!isDev) {
		navigate("/");
	}

	return (
		<main className="space-y-3 m-3">
			{PronounsList.toSorted((a, b) =>
				a.localeCompare(b, "fr", { sensitivity: "base" }),
			).map((kind) => (
				<TestKind key={kind} kind={kind} />
			))}
		</main>
	);
};
