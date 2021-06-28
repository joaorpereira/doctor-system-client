/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from "@reduxjs/toolkit";

const clientsSlice = createSlice({
  name: "clients",
  initialState: {},
  reducers: {
    getClients() {},
    setClients(state, action) {
      const clients = action.payload;
      return { ...state, ...clients };
    },
    setClientInfo(state, action) {
      const client = action.payload.client;
      const isUpdate = action.payload.type;
      return { ...state, client, isUpdate };
    },
    updateClient(state, action) {
      return;
    },
    removeClient(state, action) {
      return;
    },
    createClient(state, action) {
      return;
    },
  },
});

export const {
  getClients,
  setClients,
  setClientInfo,
  updateClient,
  removeClient,
  createClient,
} = clientsSlice.actions;

export default clientsSlice.reducer;
