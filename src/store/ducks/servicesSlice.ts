/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type File = {
  reference_id: string;
  model: string;
  folder: string;
  created_at: string;
};

export type Service = {
  status?: string;
  created_at?: Date;
  _id?: string;
  company_id?: string;
  title?: string;
  price?: number;
  service_duration?: string;
  service_recurrence?: number;
  description?: string;
  files?: File[];
};

export type ServicesOptions = {
  label: string;
  value: string;
};

export type ServicePayload = {
  service: Service;
};

interface ServicesSliceState {
  services: ServicePayload[];
  service?: Service;
  type: string;
  loading?: boolean;
  servicesOptions: ServicesOptions[];
}

const initialState: ServicesSliceState = {
  services: [],
  service: {},
  servicesOptions: [],
  type: "",
  loading: false,
};

const servicesSlice = createSlice({
  name: "services",
  initialState: initialState,
  reducers: {
    getService(state, action: PayloadAction<any>) {
      return { ...state, loading: true };
    },
    getServices(state, action: PayloadAction<any>) {
      return { ...state, loading: true };
    },
    getFilteredServices(state, action: PayloadAction<any>) {
      return { ...state, loading: true };
    },
    createService(state, action: PayloadAction<any>) {
      return { ...state, loading: true };
    },
    updateService(state, action: PayloadAction<any>) {
      return { ...state, loading: true };
    },
    removeService(state, action: PayloadAction<any>) {
      return { ...state, loading: true };
    },
    setService: (state, action: PayloadAction<any>) => {
      const service = action.payload.service;
      const type = action.payload.type;
      return { ...state, service, type: type, loading: false };
    },
    setServicesSuccess(state, action: PayloadAction<any>) {
      const services = action.payload;
      return { ...state, ...services, loading: false };
    },
    setFilteredServicesSuccess(state, action: PayloadAction<any>) {
      const servicesOptions = action.payload;
      return { ...state, ...servicesOptions, loading: false };
    },
    createServicesSuccess(state, action: PayloadAction<any>) {
      const service = action.payload.service;
      state.services = [...state.services, service];
      state.loading = false;
    },
    updateServiceSuccess(state, action: PayloadAction<any>) {
      const { service } = action.payload;
      const serviceIndex = state.services.findIndex(
        (item: any) => item._id === service._id
      );
      state.services[serviceIndex] = service;
      state.loading = false;
    },
    removeServiceSuccess: (state, action: PayloadAction<any>) => {
      const service = action.payload.service;
      service.status = "INATIVO";
      const serviceIndex = state.services.findIndex(
        (item: any) => item._id === service._id
      );
      state.services[serviceIndex] = service;
      state.loading = false;
    },
  },
});

export const {
  getService,
  getServices,
  getFilteredServices,
  createService,
  updateService,
  removeService,
  setService,
  setServicesSuccess,
  setFilteredServicesSuccess,
  createServicesSuccess,
  updateServiceSuccess,
  removeServiceSuccess,
} = servicesSlice.actions;

export default servicesSlice.reducer;
