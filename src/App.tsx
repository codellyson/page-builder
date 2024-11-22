import { MantineProvider } from "@mantine/core";
import { Grapejs } from "./component/grapejs/grapejs";
import "@mantine/core/styles.css";
function App() {
  return (
    <MantineProvider theme={{
      fontSizes: {
        md: "12px",
        sm: "10px",
        xs: "8px",
        lg: "16px",
        xl: "20px",
      }
    }}>
      <Grapejs />
    </MantineProvider>
  );
}

export default App;
