import { HomeIcon } from "lucide-react";
import { Link } from "react-router";
import { Layout } from "@/components/common/Layout";
import { buttonVariants } from "@/components/ui/button";

export const NotFound = () => {
	return (
		<Layout>
			<main className="mx-auto max-w-xl p-4 md:my-12 space-y-6">
				<hgroup className="space-y-3">
					<h1 className="font-bold text-lg text-center">Page introuvable</h1>
					<p className="text-muted-foreground text-center">
						Cette page n'existe pas ou plus
					</p>
				</hgroup>

				<nav className="flex items-center mx-auto justify-center gap-4">
					<Link className={buttonVariants({ size: "lg" })} to="/">
						<HomeIcon className="size-4" data-icon="inline-start" />
						Accueil
					</Link>
				</nav>
			</main>
		</Layout>
	);
};
