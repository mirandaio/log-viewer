import { useEffect, useState } from "react";
import { CssBaseline, Typography } from "@material-ui/core";
import { FixedSizeList as List } from "react-window";

import fetchLogs from "./fetchLogs";

const Row = ({ index, style, data }) => {
  return <div style={style}>{data.logs[index]}</div>;
};

function computeStats(logs, stats) {
  let { info, warning, error } = stats;

  logs.forEach((log) => {
    if (log.includes("INFO")) {
      info++;
    } else if (log.includes("WARNING")) {
      warning++;
    } else if (log.includes("ERROR")) {
      error++;
    }
  });

  return { info, warning, error };
}

function App() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ info: 0, warning: 0, error: 0 });

  useEffect(() => {
    let isCurrent = true;
    const interval = setInterval(() => {
      fetchLogs().then((data) => {
        if (isCurrent) {
          const newLogs = data.split("\n");
          setLogs((logs) => [...logs, ...newLogs]);
          setStats((stats) => computeStats(newLogs, stats));
        }
      });
    }, 1000);

    return () => {
      isCurrent = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <Typography>Log viewer</Typography>
      <div>Statistics</div>
      <div>INFO: {stats.info}</div>
      <div>WARNINGS: {stats.warning}</div>
      <div>ERRORS: {stats.error}</div>
      <List
        height={500}
        itemCount={logs.length}
        itemSize={35}
        width={500}
        itemData={{ logs }}
      >
        {Row}
      </List>
    </>
  );
}

export default App;
