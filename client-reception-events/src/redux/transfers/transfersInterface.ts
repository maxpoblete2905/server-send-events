//transfersInterface.ts
import { SerializedError } from '@reduxjs/toolkit';
import { TransferData } from '../../interfaces/TransferData';

export interface TransfersSliceState {
 transfers: TransferData[];
 loadingTransfers: boolean;
 error: null | SerializedError;
}

export const initialStateTransfers: TransfersSliceState = {
 transfers: [],
 loadingTransfers: true,
 error: null,
};
