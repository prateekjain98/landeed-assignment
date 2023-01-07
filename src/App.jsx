import "./App.css";
import Countdown from "./components/Countdown";
import WorldClock from "./components/WorldClock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mainContainer">
        <Countdown />
        <WorldClock />
      </div>
    </QueryClientProvider>
  );
}

export default App;
