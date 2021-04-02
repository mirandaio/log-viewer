import { CssBaseline, Typography } from "@material-ui/core";
import LogsViewer from "./features/logsViewer/LogsViewer";

function App() {
  return (
    <>
      <CssBaseline />
      <Typography>Log viewer</Typography>
      <LogsViewer />
    </>
  );
}

export default App;
