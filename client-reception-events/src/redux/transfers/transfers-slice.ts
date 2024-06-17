// transfers-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTransfers } from "./transfersApi";
import { initialStateTransfers } from "./transfersInterface";
import { TransferData } from "../../interfaces/TransferData";

export const transfersSlice = createSlice({
  name: "transfers",
  initialState: initialStateTransfers,
  reducers: {
    addTransfer: (state, action: PayloadAction<TransferData>) => {
      const existingTransfer = state.transfers.find(
        (transfer) => transfer.id === action.payload.id
      );
      if (!existingTransfer) {
        state.transfers.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransfers.pending, (state) => {
      state.transfers = [];
      state.loadingTransfers = true;
    });

    builder.addCase(getTransfers.fulfilled, (state, action) => {
      state.transfers = action.payload;
      state.loadingTransfers = false;
      state.error = null;
    });

    builder.addCase(getTransfers.rejected, (state, action) => {
      state.transfers = [];
      state.loadingTransfers = false;
      state.error = action.error;
    });
  },
});

export const { addTransfer } = transfersSlice.actions;

export default transfersSlice.reducer;
