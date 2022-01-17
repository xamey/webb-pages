import "./App.css";
import Terminal from "./components/Terminal/Terminal";
import { LoadingProvider } from "./hooks/LoadingProvider";
import { SearchProvider } from "./hooks/SearchProvider";
import { SnackbarProvider } from "./hooks/SnackbarProvider";

function App() {
  return (
    <SearchProvider>
      <SnackbarProvider>
        <LoadingProvider>
          <Terminal />
        </LoadingProvider>
      </SnackbarProvider>
    </SearchProvider>
  );
}

export default App;
