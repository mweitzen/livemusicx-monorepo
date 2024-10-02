import "@repo/ui/styles.css";
import "@repo/ui/ui.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { TRPCReactProvider } from "@repo/trpc/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TRPCReactProvider>
      <App />
    </TRPCReactProvider>
  </StrictMode>
);
