import { configureStore } from "@reduxjs/toolkit";
import logsReducer from "../features/logsViewer/logsSlice";
import statsReducer from "../features/logsViewer/statsSlice";

export default configureStore({
  reducer: {
    logs: logsReducer,
    stats: statsReducer,
  },
});
