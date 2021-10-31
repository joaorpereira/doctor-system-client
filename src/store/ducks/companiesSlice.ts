/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BankAccount,
  Address,
  OptionType,
  GeolocationProps,
} from "../../utils/types";

export type Company = {
  address: Address;
  bank_account?: BankAccount;
  geolocation?: GeolocationProps;
  status: string;
  created_at: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  recipient_id: string;
  picture: string;
  role?: string;
  background: string;
};

export interface CompaniesSliceState {
  companies: Company[];
  company: Company;
  companiesOptions: OptionType[];
  loading?: boolean;
  distance: number;
}

const initialState: CompaniesSliceState = {
  companies: [],
  companiesOptions: [],
  loading: false,
  company: {
    address: {
      country: "",
      state: "",
      city: "",
      cep: "",
      number: "",
      street: "",
    },
    status: "",
    geolocation: {
      type: "",
      coordinates: [],
    },
    _id: "",
    name: "",
    email: "",
    password: "",
    phone_number: "",
    recipient_id: "",
    picture: "",
    role: "",
    created_at: "",
    background: "",
  },
  distance: 0,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState: initialState,
  reducers: {
    getCompanies(state) {
      return { ...state, loading: true };
    },
    getFilteredCompanies(state) {
      return { ...state, loading: true };
    },
    setCompany(state, action: PayloadAction<any>) {
      return { ...state, loading: true };
    },
    createCompany: (state, action: PayloadAction<any>) => {
      return { ...state, loading: true };
    },
    setCompanies(state, action: PayloadAction<any>) {
      const companies = action.payload;
      return { ...state, ...companies, loading: false };
    },
    setFilteredCompaniesSuccess(state, action: PayloadAction<any>) {
      const companiesOptions = action.payload;
      return { ...state, ...companiesOptions, loading: false };
    },
    createCompanySuccess: (state, action: PayloadAction<any>) => {
      const company = action.payload.company;
      state.companies = [...state.companies, company];
      state.loading = false;
    },
    setCompanySuccess: (state, action: PayloadAction<any>) => {
      const { company, distance } = action.payload.company;
      return {
        ...state,
        company,
        distance,
        loading: false,
      };
    },
  },
});

export const {
  getCompanies,
  getFilteredCompanies,
  setCompany,
  createCompany,
  setCompanies,
  createCompanySuccess,
  setFilteredCompaniesSuccess,
  setCompanySuccess,
} = companiesSlice.actions;

export default companiesSlice.reducer;
