/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export interface SchedulesSliceState {
  schedules: Schedule[];
}

const initialState: SchedulesSliceState = {
  schedules: [],
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState: initialState,
  reducers: {
    getSchedules(state, action: PayloadAction<any>) {
      return { ...state };
    },
    setSchedules(state, action) {
      const schedules = action.payload;
      return { ...state, ...schedules };
    },
  },
});

export const { setSchedules, getSchedules } = schedulesSlice.actions;

export default schedulesSlice.reducer;
