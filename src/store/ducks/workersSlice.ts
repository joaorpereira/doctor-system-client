/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BankAccount, DocumentProps } from "../../utils/types";

export type Worker = {
  name: string;
  email: string;
  password: string;
  picture: string;
  phone_number: string;
  gender: string;
  birth_date: string;
  document: DocumentProps;
  services: string[];
  bank_account: BankAccount;
  _id: string;
};

interface WorkersSliceState {
  workers: Worker[];
  worker?: Worker | Record<string, never>;
  type: string;
  loadingData?: boolean;
  loadingRequest?: boolean;
  success?: boolean;
}

const initialState: WorkersSliceState = {
  workers: [],
  worker: {},
  type: "",
  loadingData: false,
  loadingRequest: false,
  success: false,
};

export const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    getWorkers(state) {
      return { ...state, loadingData: true };
    },
    getWorkersByCompany(state, action: PayloadAction<any>) {
      return { ...state, loadingData: true };
    },
    updateWorker: (state, action: PayloadAction<any>) => {
      return { ...state, loadingRequest: true, success: false };
    },
    createWorker: (state, action: PayloadAction<any>) => {
      return { ...state, loadingRequest: true, success: false };
    },
    removeWorker: (state, action: PayloadAction<any>) => {
      return { ...state, loadingRequest: true, success: false };
    },
    setWorker: (state, action: PayloadAction<any>) => {
      const worker = action.payload.worker;
      const type = action.payload.type;
      return { ...state, worker: worker, type: type, loadingData: false };
    },
    setWorkersSuccess: (state, action: PayloadAction<any>) => {
      const workers = action.payload.workers;
      return { ...state, workers, loadingData: false };
    },
    updateWorkerSuccess: (state, action: PayloadAction<any>) => {
      const { worker } = action.payload;
      const workerIndex = state.workers.findIndex(
        (item) => item._id === worker._id
      );
      state.workers[workerIndex] = worker;
      state.loadingRequest = false;
      state.success = true;
    },
    createWorkerSuccess: (state, action: PayloadAction<any>) => {
      const worker = action.payload.worker;
      state.workers = [...state.workers, worker];
      state.loadingRequest = false;
      state.success = true;
    },
    removeWorkerSuccess: (state, action: PayloadAction<any>) => {
      state.workers = state.workers.filter(
        (item: Worker) => item._id !== action.payload.id
      );
      state.loadingRequest = false;
      state.success = true;
    },
  },
});

export const {
  getWorkers,
  getWorkersByCompany,
  setWorker,
  updateWorker,
  removeWorker,
  createWorker,
  setWorkersSuccess,
  createWorkerSuccess,
  updateWorkerSuccess,
  removeWorkerSuccess,
} = workersSlice.actions;

export default workersSlice.reducer;
