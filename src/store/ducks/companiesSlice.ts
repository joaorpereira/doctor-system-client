import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
  name: "companies",
  initialState: {},
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getCompanies() {},
    setCompanies(state, action) {
      const companies = action.payload;
      return { ...state, ...companies };
    },
  },
});

export const { getCompanies, setCompanies } = companiesSlice.actions;

export default companiesSlice.reducer;
