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
    setClientInfo(state, action) {
      const client = action.payload.client;
      const isUpdate = action.payload.type === "update" ? true : false;
      return { ...state, client, isUpdate };
    },
  },
});

export const { getClients, setClients, setClientInfo } = clientsSlice.actions;

export default clientsSlice.reducer;
