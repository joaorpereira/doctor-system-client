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
    setCompanies(state, action: PayloadAction<any>) {
      const companies = action.payload;
      return { ...state, ...companies, loading: false };
    },
    setFilteredCompaniesSuccess(state, action: PayloadAction<any>) {
      const companiesOptions = action.payload;
      return { ...state, ...companiesOptions, loading: false };
    },
  },
});

export const {
  getCompanies,
  getFilteredCompanies,
  setCompanies,
  setFilteredCompaniesSuccess,
} = companiesSlice.actions;

export default companiesSlice.reducer;
