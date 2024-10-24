import AppRouter from "./app/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
