/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BankAccount, DocumentProps } from "../../utils/globalTypes";

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
  _id?: string;
};

interface WorkersSliceState {
  workers: Worker[];
  worker?: Record<string, never>;
  type: string;
  loading?: boolean;
}

const initialState: WorkersSliceState = {
  workers: [],
  worker: {},
  type: "",
  loading: false,
};

export const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    getWorkers(state) {
      return { ...state, loading: true };
    },
    getWorkersByCompany(state, action: PayloadAction<any>) {
      return { ...state, loading: true };
    },
    updateWorker: (state, action: PayloadAction<any>) => {
      return { ...state, loading: true };
    },
    createWorker: (state, action: PayloadAction<any>) => {
      return { ...state, loading: true };
    },
    removeWorker: (state, action: PayloadAction<any>) => {
      return { ...state, loading: true };
    },
    setWorker: (state, action: PayloadAction<any>) => {
      const worker = action.payload.worker;
      const type = action.payload.type;
      return { ...state, worker: worker, type: type, loading: false };
    },
    setWorkersSuccess: (state, action: PayloadAction<any>) => {
      const workers = action.payload.workers;
      return { ...state, workers, loading: false };
    },
    updateWorkerSuccess: (state, action: PayloadAction<any>) => {
      const { worker } = action.payload;
      const workerIndex = state.workers.findIndex(
        (item) => item._id === worker._id
      );
      state.workers[workerIndex] = worker;
      state.loading = false;
    },
    createWorkerSuccess: (state, action: PayloadAction<any>) => {
      const worker = action.payload.worker;
      state.workers = [...state.workers, worker];
      state.loading = false;
    },
    removeWorkerSuccess: (state, action: PayloadAction<any>) => {
      state.workers = state.workers.filter(
        (item: Worker) => item._id !== action.payload.id
      );
      state.loading = false;
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
