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
  role?: string;
};

export type Options = {
  label: string;
  value: string;
  services: string[];
};

export interface WorkersSliceState {
  workers: Worker[];
  worker: Worker | Record<string, never>;
  type: string;
  loadingData?: boolean;
  loadingRequest?: boolean;
  success?: boolean;
  workersOptions: Options[];
}

const initialState: WorkersSliceState = {
  workers: [],
  workersOptions: [],
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
    updateWorkerProfilePicture(state, action: PayloadAction<any>) {
      return { ...state };
    },
    setWorkersSuccess: (state, action: PayloadAction<any>) => {
      const workers = action.payload.workers;

      return { ...state, workers, loadingData: false };
    },
    setWorkersOptionsSuccess: (state, action: PayloadAction<any>) => {
      const workers = action.payload.workers;
      const workersOptions = workers.map((worker: any) => ({
        services: worker.services,
        label: worker.name,
        value: worker._id,
      }));

      return { ...state, workersOptions, loadingData: false };
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
    updateWorkerProfilePictureSuccess(state, action: PayloadAction<any>) {
      const { picture } = action.payload;
      const newWorker = { ...state.worker };
      newWorker["picture"] = picture;
      return { ...state, client: newWorker, loadingData: false };
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
  updateWorkerProfilePicture,
  setWorkersSuccess,
  createWorkerSuccess,
  updateWorkerSuccess,
  removeWorkerSuccess,
  setWorkersOptionsSuccess,
  updateWorkerProfilePictureSuccess,
} = workersSlice.actions;

export default workersSlice.reducer;
