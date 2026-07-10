import { AlertCircleIcon, Eye, Pencil } from "lucide-react";
import { Link } from "react-router";
import { Layout } from "@/components/common/Layout.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { buttonVariants } from "@/components/ui/button.tsx";

export const Home = () => (
	<Layout>
		<main className="mx-auto max-w-xl p-4 md:my-12 space-y-4 md:space-y-12">
			<hgroup className="space-y-3">
				<h1 className="font-bold text-lg text-center">Bienvenue !</h1>
				<p className="text-muted-foreground text-justify">
					Ce site vous permet de montrer et d'expliquer facilement les pronoms
					que vous souhaitez utiliser. La langue française est extrêmement
					genrée : j'espère que cet outil vous aidera à trouver et à retenir les
					tournures de phrases à utiliser avec vos néo-pronoms.
				</p>
			</hgroup>

			<nav className="flex flex-wrap items-center mx-auto justify-center gap-4">
				<Link className={buttonVariants({ size: "lg" })} to="/e/">
					<Pencil data-icon="inline-start" />
					Choisir les vôtres
				</Link>
				<Link
					className={buttonVariants({ size: "lg", variant: "outline" })}
					to="/v/iel"
				>
					<Eye data-icon="inline-start" />
					Exemple avec iel
				</Link>
				<Link
					className={buttonVariants({ size: "lg", variant: "outline" })}
					to="/v/al"
				>
					<Eye data-icon="inline-start" />
					Exemple avec al
				</Link>
			</nav>

			<Alert className="text-justify" variant="default">
				<AlertCircleIcon />
				<AlertTitle>Attention !</AlertTitle>
				<AlertDescription>
					<p>
						Une fois votre sélection faite, vous pouvez partager ce lien
						n'importe où.
						<br />
						Cependant, comme l'information est stockée dans l'URL, si vous
						souhaitez modifier vos pronoms, vous devrez générer un nouveau lien.
					</p>
				</AlertDescription>
			</Alert>
		</main>
	</Layout>
);
