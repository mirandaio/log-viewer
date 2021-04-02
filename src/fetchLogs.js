const messageTypes = [
  "INFO Some info message",
  "WARNING Some warning message",
  "ERROR Some error message",
];

// function that simulates an async call to get more logs
function fetchLogs() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const numLogs = Math.floor(10 * Math.random()) + 1;
      const logs = new Array(numLogs);
      const t = Date.now();

      for (let i = 0; i < numLogs; i++) {
        const messageType = Math.floor(3 * Math.random());
        const dt = new Date(t + i * 1000).toISOString();
        logs[i] = `${dt.slice(0, dt.length - 1)} ${messageTypes[messageType]}`;
      }
      resolve(logs.join("\n"));
    }, 800);
  });
}

export default fetchLogs;
