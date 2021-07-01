/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressProps, DocumentProps } from "../../utils/globalTypes";

interface Client {
  document: DocumentProps;
  address: AddressProps;
  name: string;
  email: string;
  password: string;
  picture: string;
  phone_number: string;
  gender: string;
  birth_date: string;
  _id?: string;
}

interface ClientsSliceState {
  clients: Client[];
  client?: Record<string, never>;
  type: string;
  loading?: boolean;
}

const initialState: ClientsSliceState = {
  clients: [],
  client: {},
  type: "",
  loading: false,
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getClients(state) {
      return { ...state, loading: true };
    },
    updateClient: (state, action: PayloadAction<any>) => {
      return { ...state, loading: true };
    },
    createClient: (state, action: PayloadAction<any>) => {
      return { ...state, loading: true };
    },
    removeClient: (state, action: PayloadAction<any>) => {
      return { ...state, loading: true };
    },
    setClient: (state, action: PayloadAction<any>) => {
      const client = action.payload.client;
      const type = action.payload.type;
      return { ...state, client: client, type: type, loading: false };
    },
    setClientsSuccess: (state, action: PayloadAction<any>) => {
      const clients = action.payload.clients;
      return { ...state, clients, loading: false };
    },
    updateClientSuccess: (state, action: PayloadAction<any>) => {
      const { client } = action.payload;
      const clientIndex = state.clients.findIndex(
        (item) => item._id === client._id
      );
      state.clients[clientIndex] = client;
      state.loading = false;
    },
    createClientSuccess: (state, action: PayloadAction<any>) => {
      const client = action.payload.client;
      state.clients = [...state.clients, client];
    },
    removeClientSuccess: (state, action: PayloadAction<any>) => {
      state.clients = state.clients.filter(
        (item: Client) => item._id !== action.payload.id
      );
    },
  },
});

export const {
  getClients,
  setClient,
  updateClient,
  removeClient,
  createClient,
  setClientsSuccess,
  createClientSuccess,
  updateClientSuccess,
  removeClientSuccess,
} = clientsSlice.actions;

export default clientsSlice.reducer;
