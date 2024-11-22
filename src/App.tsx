import { MantineProvider } from "@mantine/core";
import { Grapejs } from "./component/grapejs/grapejs";
import "@mantine/core/styles.css";
function App() {
  return (
    <MantineProvider>
      <Grapejs />
    </MantineProvider>
  );
}

export default App;
