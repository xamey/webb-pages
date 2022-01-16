import "./App.css";
import Terminal from "./components/Terminal/Terminal";
import { SearchProvider } from "./hooks/SearchProvider";
import { SnackbarProvider } from "./hooks/SnackbarProvider";

function App() {
  return (
    <SearchProvider>
      <SnackbarProvider>
        <Terminal />
      </SnackbarProvider>
    </SearchProvider>
  );
}

export default App;
