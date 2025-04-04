import AppRouter from "./app/Router";
import { ThemeProvider } from "@/components/DarkMode/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./Utils/queryClient";

function App(): JSX.Element {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AppRouter />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
