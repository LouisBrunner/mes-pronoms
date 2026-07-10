import "@/index.css";
import { createRoot } from "react-dom/client";
import { App } from "@/App.tsx";

const container = document.getElementById("app");
if (!container) {
	throw new Error("No container found");
}
createRoot(container).render(<App />);
