import { expect, test } from '@jest/globals';
import { filledState, testErrorMessage } from './orders-test-data';
import ordersSlice from './orders-slice';
import { getOrdersData } from './orders-thunks';

describe('ordersSlice', () => {
  const initialState = ordersSlice.getInitialState();

  test('should update the state when orders data is fetched successfully', () => {
    const action = {
      type: getOrdersData.fulfilled.type,
      payload: filledState.orders
    };
    const updatedState = ordersSlice.reducer(initialState, action);

    expect(updatedState.orders).toEqual(filledState.orders);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(null);
  });

  test('should set isLoading to true when orders data fetch is pending', () => {
    const action = { type: getOrdersData.pending.type };
    const updatedState = ordersSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(true);
    expect(updatedState.error).toBe(null);
  });

  test('should update the error when orders data fetch is rejected', () => {
    const action = {
      type: getOrdersData.rejected.type,
      error: { message: testErrorMessage }
    };
    const updatedState = ordersSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error?.message).toBe(testErrorMessage);
  });
});
