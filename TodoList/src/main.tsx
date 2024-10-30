import { createRoot } from "react-dom/client";
import "./app/styles/index.scss";
import App from "@/app/App.tsx";
import { ThemeProvider } from "@/app/providers/ThemeProvider/ui/ThemeProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./app/providers/StoreProvider/ui/StoreProvider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StoreProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>
);
