import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { getOrdersData } from './orders-thunks';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrdersData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersData.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(getOrdersData.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
        state.isLoading = false;
      });
  },
  selectors: {
    getOrders: (state) => state.orders,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  }
});

export const { getOrders, getIsLoading, getError } = ordersSlice.selectors;
export default ordersSlice;
