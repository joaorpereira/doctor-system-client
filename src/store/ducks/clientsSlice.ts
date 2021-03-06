/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressProps, DocumentProps } from "../../utils/types";

export type Client = {
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
  role?: string;
};

export interface ClientsSliceState {
  clients: Client[];
  client: Client;
  type: string;
  loadingData?: boolean;
  loadingRequest?: boolean;
  success?: boolean;
}

const initialClientState: Client = {
  document: {
    type: "",
    number: "",
  },
  address: {
    country: "",
    state: "",
    city: "",
    cep: "",
    number: "",
    street: "",
  },
  name: "",
  email: "",
  password: "",
  picture: "",
  phone_number: "",
  gender: "",
  birth_date: "",
  _id: "",
  role: "",
};

const initialState: ClientsSliceState = {
  clients: [],
  client: initialClientState,
  type: "",
  loadingData: false,
  loadingRequest: false,
  success: false,
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getClients(state) {
      return { ...state, loadingData: true };
    },
    updateClient(state, action: PayloadAction<any>) {
      return { ...state, loadingRequest: true };
    },
    createClient(state, action: PayloadAction<any>) {
      return { ...state, loadingRequest: true };
    },
    removeClient(state, action: PayloadAction<any>) {
      return { ...state, loadingRequest: true };
    },
    setClient(state, action: PayloadAction<any>) {
      const client = action.payload.client;
      const type = action.payload.type;
      return { ...state, client: client, type: type };
    },
    updateClientProfilePicture(state, action: PayloadAction<any>) {
      return { ...state, loadingRequest: true };
    },
    setClientsSuccess(state, action: PayloadAction<any>) {
      const clients = action.payload.clients;
      return { ...state, clients, loadingData: false };
    },
    updateClientSuccess(state, action: PayloadAction<any>) {
      const { client } = action.payload;
      const clientIndex = state.clients.findIndex(
        (item) => item._id === client._id
      );
      state.clients[clientIndex] = client;
      state.loadingRequest = false;
    },
    createClientSuccess(state, action: PayloadAction<any>) {
      const client = action.payload.client;
      state.clients = [...state.clients, client];
      state.loadingRequest = false;
    },
    removeClientSuccess(state, action: PayloadAction<any>) {
      state.clients = state.clients.filter(
        (item: Client) => item._id !== action.payload.id
      );
      state.loadingRequest = false;
    },
    updateClientProfilePictureSuccess(state, action: PayloadAction<any>) {
      const { picture } = action.payload;
      const newClient = { ...state.client };
      newClient["picture"] = picture.folder;
      return { ...state, client: newClient, loadingRequest: false };
    },
  },
});

export const {
  getClients,
  setClient,
  updateClient,
  removeClient,
  createClient,
  updateClientProfilePicture,
  setClientsSuccess,
  createClientSuccess,
  updateClientSuccess,
  removeClientSuccess,
  updateClientProfilePictureSuccess,
} = clientsSlice.actions;

export default clientsSlice.reducer;
