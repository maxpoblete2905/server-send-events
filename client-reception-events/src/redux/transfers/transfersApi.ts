// transfersApi.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../core/http/axios";
import { TransferData } from "../../interfaces/TransferData";
import { store } from "..";
import { addTransfer } from "./transfers-slice";

export const getTransfers = createAsyncThunk<TransferData[]>(
  "transfers",
  async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const urlApi = `${import.meta.env.VITE_BACKEND_URL}/api/transfers`;

    try {
      const response = await axiosInstance(urlApi, {
        method: "GET",
        params: {
          apikey: apiKey,
        },
      });

      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

export const startListeningForNewTransfer = () => {
  const eventSource = new EventSource(
    `${import.meta.env.VITE_BACKEND_URL}/api/listen`
  );

  eventSource.onmessage = (event) => {
    const newTransfer = JSON.parse(event.data);
    store.dispatch(addTransfer(newTransfer));
  };

  eventSource.onerror = (error) => {
    console.error("Error en la conexión del EventSource:", error);
  };
};
