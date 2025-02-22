import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FallbackErrorBoundary } from "./components/Shared/FallbackErrorBoundary";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { Notifications } from "./components/Notifications/Notifications";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";
import { AppRoutes } from "./routes/AppRouter";
import "./services/i18n";
import store from "./stores/store";
import { Background } from "./components/Shared/Background";
const queryClient = new QueryClient();

const RootApp = () => (
  <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <Notifications />
          <Background />
          <AppRoutes />
          <ReactQueryDevtools />
        </LanguageProvider>
      </QueryClientProvider>
    </Provider>
  </ErrorBoundary>
);
ReactDOM.createRoot(document.getElementById("root")!).render(<RootApp />);
