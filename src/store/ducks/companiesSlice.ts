import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BankAccount, Address } from "../../utils/globalTypes";

export type Company = {
  address: Address;
  bank_account: BankAccount;
  status: string;
  created_at: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  recipient_id: string;
};

export type CompanyOptions = {
  label: string;
  value: string;
};

export type CompanyPayload = {
  company: Company;
};
interface CompaniesSliceState {
  companies: CompanyPayload[];
  companiesOptions: CompanyOptions[];
  loading?: boolean;
}

const initialState: CompaniesSliceState = {
  companies: [],
  companiesOptions: [],
  loading: false,
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
  },
});

export const {
  getCompanies,
  getFilteredCompanies,
  createCompany,
  setCompanies,
  createCompanySuccess,
  setFilteredCompaniesSuccess,
} = companiesSlice.actions;

export default companiesSlice.reducer;
