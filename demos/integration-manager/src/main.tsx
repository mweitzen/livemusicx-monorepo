import "@repo/ui/styles.css";
import "@repo/ui/ui.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { TRPCReactProvider } from "@repo/trpc/react";
import { Toaster } from "@repo/ui/components/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TRPCReactProvider>
      <App />
      <Toaster />
    </TRPCReactProvider>
  </StrictMode>
);
