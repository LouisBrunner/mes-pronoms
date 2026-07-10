import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router";
import { ErrorFallback } from "@/components/common/ErrorFallback.tsx";
import { SpeakProvider } from "@/components/logic/SpeakProvider.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { Edit } from "@/routes/Edit.tsx";
import { Home } from "@/routes/Home.tsx";
import { NotFound } from "@/routes/NotFound.tsx";
import { Test } from "@/routes/Test.tsx";
import { View } from "@/routes/View.tsx";

export const App = () => (
	<TooltipProvider>
		<SpeakProvider>
			<Toaster />
			<BrowserRouter>
				<ErrorBoundary fallbackRender={ErrorFallback}>
					<Routes>
						<Route element={<Home />} index />
						<Route element={<Edit />} path="e/*" />
						<Route element={<View />} path="v/*" />
						<Route element={<Test />} path="test" />
						<Route element={<NotFound />} path="*" />
					</Routes>
				</ErrorBoundary>
			</BrowserRouter>
		</SpeakProvider>
	</TooltipProvider>
);
