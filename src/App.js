import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import LogsViewer from "./features/logsViewer/LogsViewer";

const useStyles = makeStyles({
  appbar: {
    marginBottom: "2rem",
  },
});

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <Typography variant="subtitle1">Logs Viewer</Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
        <LogsViewer />
      </Grid>
    </>
  );
}

export default App;
