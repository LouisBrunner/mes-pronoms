import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Edit } from "@/routes/Edit";
import { Home } from "@/routes/Home";
import { NotFound } from "@/routes/NotFound";
import { View } from "@/routes/View";
import { ErrorFallback } from "./components/common/ErrorFallback";

export const App = () => {
	return (
		<TooltipProvider>
			<BrowserRouter>
				<ErrorBoundary fallbackRender={ErrorFallback}>
					<Routes>
						<Route element={<Home />} index />
						<Route element={<Edit />} path="e/*" />
						<Route element={<View />} path="v/*" />
						<Route element={<NotFound />} path="*" />
					</Routes>
				</ErrorBoundary>
			</BrowserRouter>
			<Toaster />
		</TooltipProvider>
	);
};
