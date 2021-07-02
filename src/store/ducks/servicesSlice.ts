import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Service = {
  status?: string;
  created_at?: string;
  _id?: string;
  company_id?: string;
  title?: string;
  price?: number;
  service_duration?: string;
  service_recurrence?: number;
  description?: string;
};

export type ServiceEntry = {
  services: Service;
  file: string[];
};

interface ServicesSliceState {
  services: ServiceEntry[];
  service?: Record<string, never>;
  type: string;
  loading?: boolean;
}

const initialState: ServicesSliceState = {
  services: [],
  service: {},
  type: "",
  loading: false,
};

const servicesSlice = createSlice({
  name: "services",
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getServices(state, action: PayloadAction<any>) {
      return { ...state, loading: true };
    },
    setServicesSuccess(state, action: PayloadAction<any>) {
      const services = action.payload;
      return { ...state, ...services, loading: false };
    },
  },
});

export const { getServices, setServicesSuccess } = servicesSlice.actions;

export default servicesSlice.reducer;
