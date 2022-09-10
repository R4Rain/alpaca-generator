import Router from "./routes";
import ThemeProvider from "./themes";

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
