import { createSlice } from "@reduxjs/toolkit";

export const logsSlice = createSlice({
  name: "logs",
  initialState: [],
  reducers: {
    updateLogs: (state, action) => {
      return action.payload.concat(state);
    },
  },
});

export const { updateLogs } = logsSlice.actions;

export const selectLogs = (state) => state.logs;

export default logsSlice.reducer;
