import { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { selectStats, updateStats } from "./statsSlice";
import { selectLogs, updateLogs } from "./logsSlice";
import fetchLogs from "../../fetchLogs";

function Row({ index, style, data }) {
  return <div style={style}>{data.logs[index]}</div>;
}

const useStyle = makeStyles({
  statsContainer: {
    padding: "2rem",
    marginBottom: "1rem",
  },
  logsContainer: {
    padding: "2rem",
  },
});

function LogsViewer() {
  const classes = useStyle();
  const logs = useSelector(selectLogs);
  const stats = useSelector(selectStats);
  const dispatch = useDispatch();

  useEffect(() => {
    let isCurrent = true;
    const interval = setInterval(() => {
      fetchLogs().then((data) => {
        if (isCurrent) {
          const newLogs = data.split("\n");
          dispatch(updateLogs(newLogs));
          dispatch(updateStats(newLogs));
        }
      });
    }, 2000);

    return () => {
      isCurrent = false;
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <Grid item>
      <Paper className={classes.statsContainer}>
        <Typography variant="h6">Statistics</Typography>
        <div>INFO: {stats.info}</div>
        <div>WARNINGS: {stats.warning}</div>
        <div>ERRORS: {stats.error}</div>
      </Paper>
      <Paper className={classes.logsContainer}>
        <List
          height={600}
          itemCount={logs.length}
          itemSize={35}
          width={550}
          itemData={{ logs }}
        >
          {Row}
        </List>
      </Paper>
    </Grid>
  );
}

export default LogsViewer;
