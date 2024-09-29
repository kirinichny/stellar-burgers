import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedData } from './feed-thunks';

type TFeedState = {
  feed: TOrdersData;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getFeedData.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feed = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getFeedData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedData.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
  selectors: {
    getFeed: (state) => state.feed,
    getOrders: (state) => state.feed.orders,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  }
});

export const { getFeed, getOrders, getIsLoading, getError } =
  feedSlice.selectors;
export default feedSlice;
