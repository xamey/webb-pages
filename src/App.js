import "./App.css";
import Terminal from "./components/Terminal/Terminal";
import { LoadingProvider } from "./hooks/LoadingProvider";
import { ResultsProvider } from "./hooks/ResultsProvider";
import { SearchProvider } from "./hooks/SearchProvider";
import { SnackbarProvider } from "./hooks/SnackbarProvider";

function App() {
  return (
    <LoadingProvider>
      <ResultsProvider>
        <SearchProvider>
          <SnackbarProvider>
            <Terminal />
          </SnackbarProvider>
        </SearchProvider>
      </ResultsProvider>
    </LoadingProvider>
  );
}

export default App;
