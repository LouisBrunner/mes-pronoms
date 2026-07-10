import { type ReactNode, useEffect } from "react";
import { Link } from "react-router";

export type LayoutProps = {
	menu?: ReactNode;
	children: ReactNode;
	title?: string;
};

export const Layout = ({ title, menu, children }: LayoutProps) => {
	useEffect(() => {
		document.title = title ? `Mes Pronoms - ${title}` : "Mes Pronoms";
	}, [title]);

	return (
		<>
			<header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-md">
				<div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4 h-14">
					<Link className="font-semibold" to="/">
						<span className="hidden sm:inline">Mes Pronoms</span>
						<span className="inline sm:hidden">iel</span>
					</Link>
					{menu}
				</div>
			</header>

			{children}
		</>
	);
};
