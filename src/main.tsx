import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@styles/index.css";
import "@tanstack/react-query";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@utils/config/client.ts";
import type { ResType } from "@interfaces/resInterface.ts";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ResType;
  }
}

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
