import { createSlice, createAction } from "@reduxjs/toolkit";
import { IScheduleProps } from "../../screens/Home";
import { withPayloadType } from "../common/types";

// === ACTIONS ===

export const getSchedules = createAction(
  "schedules/getSchedules",
  withPayloadType<IScheduleProps>()
);

// === SLICES ===

const schedulesSlice = createSlice({
  name: "schedules",
  initialState: {},
  reducers: {
    setSchedules(state, action) {
      const schedules = action.payload;
      return { ...state, ...schedules };
    },
  },
});

export const { setSchedules } = schedulesSlice.actions;

export default schedulesSlice.reducer;
