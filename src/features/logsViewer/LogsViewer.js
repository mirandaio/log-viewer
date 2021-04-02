import { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";
import { selectStats, updateStats } from "./statsSlice";
import { selectLogs, updateLogs } from "./logsSlice";
import fetchLogs from "../../fetchLogs";

function Row({ index, style, data }) {
  return <div style={style}>{data.logs[index]}</div>;
}

function LogsViewer() {
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
    <>
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

export default LogsViewer;
