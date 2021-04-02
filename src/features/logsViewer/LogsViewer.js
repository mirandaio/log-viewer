import { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { selectStats, updateStats } from "./statsSlice";
import { selectLogs, updateLogs } from "./logsSlice";
import PieChart from "./PieChart";
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
    <Grid item container justify="space-around">
      <Grid item md={4}>
        <Paper className={classes.statsContainer}>
          <Typography variant="h6" align="center">
            Statistics
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={12} md={4}>
              <div>INFO: {stats.info}</div>
              <div>WARNINGS: {stats.warning}</div>
              <div>ERRORS: {stats.error}</div>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <PieChart stats={stats} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
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
    </Grid>
  );
}

export default LogsViewer;
