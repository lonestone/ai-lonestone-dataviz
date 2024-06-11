import { Home } from "@/components/templates/Home";
import { ThemeProvider } from "@/providers/theme.provider";

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;
