import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextContainer } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchInterval: 1000,
      refetchOnWindowFocus: false, // default: true
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthContextContainer>
        <App />
      </AuthContextContainer>
    </BrowserRouter>
  </QueryClientProvider>
);
