import { expect, test } from '@jest/globals';
import { filledState, testErrorMessage } from './feed-test-data';
import feedSlice from './feed-slice';
import { getFeedData } from './feed-thunks';

describe('feedSlice', () => {
  const initialState = feedSlice.getInitialState();

  test('should update the state when feed data is fetched successfully', () => {
    const action = {
      type: getFeedData.fulfilled.type,
      payload: filledState.feed
    };
    const updatedState = feedSlice.reducer(initialState, action);

    expect(updatedState.feed.total).toBe(filledState.feed.total);
    expect(updatedState.feed.totalToday).toBe(filledState.feed.totalToday);
    expect(updatedState.feed.orders).toEqual(filledState.feed.orders);
    expect(updatedState.isLoading).toBe(false);
  });

  test('should set isLoading to true when feed data fetch is pending', () => {
    const action = { type: getFeedData.pending.type };
    const updatedState = feedSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(true);
    expect(updatedState.error).toBe(null);
  });

  test('should update the error when feed data fetch is rejected', () => {
    const action = {
      type: getFeedData.rejected.type,
      error: { message: testErrorMessage }
    };
    const updatedState = feedSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error?.message).toBe(testErrorMessage);
  });
});
