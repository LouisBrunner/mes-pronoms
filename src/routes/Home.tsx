import { AlertCircleIcon, Eye, Pencil } from "lucide-react";
import { Link } from "react-router";
import { Layout } from "@/components/common/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { IEL } from "@/logic/content/iel";
import { packStore } from "@/logic/storage/packing";

export const Home = () => {
	return (
		<Layout>
			<main className="mx-auto max-w-xl p-4 md:my-12 space-y-4 md:space-y-12">
				<hgroup className="space-y-3">
					<h1 className="font-bold text-lg text-center">Bienvenue !</h1>
					<p className="text-muted-foreground text-justify">
						Ce site vous permet de facilement montrer et expliquer les pronoms
						que vous souhaitez utiliser. La langue française est extrêmement
						genrée et j'espère que cet outil vous aidera à retenir les tournures
						de phrases à utiliser avec des néo-pronoms.
					</p>
				</hgroup>

				<nav className="flex items-center mx-auto justify-center gap-4">
					<Link className={buttonVariants({ size: "lg" })} to="/e/">
						<Pencil data-icon="inline-start" />
						Choisir les votres
					</Link>
					<Link
						className={buttonVariants({ size: "lg", variant: "outline" })}
						to={`/v/${packStore(IEL, { compress: true })}`}
					>
						<Eye data-icon="inline-start" />
						Voir un exemple
					</Link>
				</nav>

				<Alert className="text-justify" variant="default">
					<AlertCircleIcon />
					<AlertTitle>Attention !</AlertTitle>
					<AlertDescription>
						<p>
							Une fois que vous avez fais votre sélection, vous pouvez partager
							ce lien n'importe où.
							<br />
							Cependant, vu que l'information est stockée dans l'URL, si vous
							désirez modifier vos pronoms, vous devrez générer un nouveau lien.
						</p>
					</AlertDescription>
				</Alert>
			</main>
		</Layout>
	);
};
