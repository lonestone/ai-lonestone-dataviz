import { Home } from "@/components/templates/Home";
import { JsonProvider } from "@/providers/json.provider";
import { ThemeProvider } from "@/providers/theme.provider";

function App() {
  return (
    <ThemeProvider>
      <JsonProvider>
        <Home />
      </JsonProvider>
    </ThemeProvider>
  );
}

export default App;
