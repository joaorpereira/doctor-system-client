import { createSlice, createAction } from "@reduxjs/toolkit";
import { IScheduleProps } from "../../screens/Home";
import { withPayloadType } from "../common/types";

export type Schedule = {
  client_id: { _id: string; name: string };
  schedule_date: string;
  service_id: { _id: string; title: string; service_duration: string };
  worker_id: { _id: string; name: string };
  company_id: string;
  created_at: string;
  transaction_id: string;
  updated_at: string;
  __v: string;
  _id: string;
};

export type FormatedSchedule = {
  title: string;
  start: Date;
  end: Date;
};

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
