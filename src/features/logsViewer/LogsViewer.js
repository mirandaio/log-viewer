import { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
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
  const [intervalFlag, setIntervalFlag] = useState(false);
  const logs = useSelector(selectLogs);
  const stats = useSelector(selectStats);
  const dispatch = useDispatch();

  useEffect(() => {
    let isFetching = false;
    let interval;

    if (!intervalFlag) {
      // set up an interval that will periodically fetch for new logs
      interval = setInterval(() => {
        if (!isFetching) {
          isFetching = true;
          fetchLogs().then((data) => {
            const newLogs = data.split("\n");
            dispatch(updateLogs(newLogs));
            dispatch(updateStats(newLogs));
            isFetching = false;
          });
        }
      }, 2000);

      setIntervalFlag(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, intervalFlag]);

  return (
    <Grid item container justify="space-around" md={12} lg={12} xl={7}>
      <Grid item md={4}>
        <Paper className={classes.statsContainer}>
          <Typography variant="h6" align="center">
            Statistics
          </Typography>
          {logs.length === 0 ? (
            <Skeleton height={250} width="100%" />
          ) : (
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <div>INFO: {stats.info}</div>
                <div>WARNING: {stats.warning}</div>
                <div>ERROR: {stats.error}</div>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                md={12}
                lg={8}
                justify="center"
              >
                <PieChart
                  info={stats.info}
                  warning={stats.warning}
                  error={stats.error}
                />
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
      <Grid item md={6}>
        <Paper className={classes.logsContainer}>
          {logs.length === 0 ? (
            <Skeleton variant="rect" height={600} />
          ) : (
            <List
              height={600}
              itemCount={logs.length}
              itemSize={35}
              width={550}
              itemData={{ logs }}
            >
              {Row}
            </List>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LogsViewer;
