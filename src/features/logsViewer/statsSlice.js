import { createSlice } from "@reduxjs/toolkit";

function computeNewStats(logs, stats) {
  logs.forEach((log) => {
    if (log.includes("INFO")) {
      stats.info++;
    } else if (log.includes("WARNING")) {
      stats.warning++;
    } else if (log.includes("ERROR")) {
      stats.error++;
    }
  });
}

export const statsSlice = createSlice({
  name: "stats",
  initialState: {
    info: 0,
    warning: 0,
    error: 0,
  },
  reducers: {
    updateStats: (state, action) => {
      computeNewStats(action.payload, state);
    },
  },
});

export const { updateStats } = statsSlice.actions;

export const selectStats = (state) => state.stats;

export default statsSlice.reducer;
