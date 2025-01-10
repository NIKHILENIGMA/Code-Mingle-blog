import AppRouter from "./app/Router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./Utils/queryClient";


function App(): JSX.Element {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
