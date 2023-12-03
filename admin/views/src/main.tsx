import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.tsx";
import UserStateContext from "./context/UserStateContext.tsx";
import SocketContext from "./context/SocketContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserStateContext>
        <SocketContext>
          <App />
        </SocketContext>
      </UserStateContext>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
