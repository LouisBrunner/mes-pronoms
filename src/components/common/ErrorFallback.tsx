import { CircleX, Home, RotateCcw } from "lucide-react";
import { type FallbackProps, getErrorMessage } from "react-error-boundary";
import { Link } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button, buttonVariants } from "../ui/button";
import { Layout } from "./Layout";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
	<Layout>
		<main className="max-w-xl mx-auto px-4 py-3">
			<Alert className="pb-2" variant="destructive">
				<CircleX />
				<AlertTitle>Erreur</AlertTitle>
				<AlertDescription className="space-y-2">
					<p className="">{getErrorMessage(error)}</p>
					<nav className="flex gap-2 justify-center">
						<Button onClick={resetErrorBoundary}>
							<RotateCcw /> Réessayer
						</Button>
						<Link
							className={buttonVariants({
								className: "no-underline!",
								variant: "outline",
							})}
							to="/"
						>
							<Home /> Retourner à l'accueil
						</Link>
					</nav>
				</AlertDescription>
			</Alert>
		</main>
	</Layout>
);
