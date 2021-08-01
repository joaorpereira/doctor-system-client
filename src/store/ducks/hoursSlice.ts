/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Hour = {
  services: string[];
  workers: string[];
  days: number[];
  created_at: string;
  _id: string;
  company_id: string;
  start_time: string;
  end_time: string;
};

interface HoursSliceState {
  hours: Hour[];
  services: any[];
  hour?: Hour | Record<string, never>;
  loadingData?: boolean;
  loadingRequest?: boolean;
  success?: boolean;
  type: string;
}

const initialState: HoursSliceState = {
  hours: [],
  services: [],
  hour: {},
  loadingRequest: false,
  loadingData: false,
  success: false,
  type: "",
};

const hoursSlice = createSlice({
  name: "hours",
  initialState,
  reducers: {
    getHoursByCompany(state, action: PayloadAction<any>) {
      return { ...state };
    },
    getHoursByService(state, action: PayloadAction<any>) {
      return { ...state };
    },
    setHoursByCompany(state, action) {
      const hours = action.payload;
      return { ...state, ...hours };
    },
    setHoursByService(state, action) {
      const services = action.payload;
      return { ...state, ...services };
    },
    setHour(state, action) {
      const { hour, type } = action.payload;
      return { ...state, hour, type };
    },
    updateHour: (state, action: PayloadAction<any>) => {
      return { ...state, loadingRequest: true, success: false };
    },
    createHour: (state, action: PayloadAction<any>) => {
      return { ...state, loadingRequest: true, success: false };
    },
    removeHour: (state, action: PayloadAction<any>) => {
      return { ...state, loadingRequest: true, success: false };
    },
    updateHourSuccess: (state, action: PayloadAction<any>) => {
      const { hour } = action.payload;
      const hourIndex = state.hours.findIndex((item) => item._id === hour._id);
      state.hours[hourIndex] = hour;
      state.loadingRequest = false;
      state.success = true;
    },
    createHourSuccess: (state, action: PayloadAction<any>) => {
      const hour = action.payload.hour;
      state.hours = [...state.hours, hour];
      state.loadingRequest = false;
      state.success = true;
    },
    removeHourSuccess: (state, action: PayloadAction<any>) => {
      state.hours = state.hours.filter(
        (item: any) => item._id !== action.payload.id
      );
      state.loadingRequest = false;
      state.success = true;
    },
  },
});

export const {
  getHoursByCompany,
  getHoursByService,
  setHoursByCompany,
  setHoursByService,
  setHour,
  updateHour,
  createHour,
  removeHour,
  updateHourSuccess,
  createHourSuccess,
  removeHourSuccess,
} = hoursSlice.actions;

export default hoursSlice.reducer;
