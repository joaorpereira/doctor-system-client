import { createSlice } from "@reduxjs/toolkit";

const clientsSlice = createSlice({
  name: "clients",
  initialState: {},
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getClients() {},
    setClients(state, action) {
      const clients = action.payload;
      return { ...state, ...clients };
    },
  },
});

export const { getClients, setClients } = clientsSlice.actions;

export default clientsSlice.reducer;
