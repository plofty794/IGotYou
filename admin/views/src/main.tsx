import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.tsx";
import UserStateContext from "./context/UserStateContext.tsx";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserStateContext>
        <App />
        <SonnerToaster position="top-center" />
      </UserStateContext>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
