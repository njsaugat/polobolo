import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Notifications } from "./components/Notifications/Notifications";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";
import { AppRoutes } from "./routes/AppRouter";
import "./services/i18n";
import store from "./stores/store";
const queryClient = new QueryClient();

const RootApp = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Notifications />
        <AppRoutes />
        {/* <SocketProvider>
      </SocketProvider> */}
        <ReactQueryDevtools />
      </LanguageProvider>
    </QueryClientProvider>
  </Provider>
);
ReactDOM.createRoot(document.getElementById("root")!).render(<RootApp />);
