import AppRouter from "./app/Router";
import { ThemeProvider } from "@/components/DarkMode/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./Utils/queryClient";
import { AuthProvider } from "./components/common/AuthContext";

function App(): JSX.Element {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AppRouter />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
