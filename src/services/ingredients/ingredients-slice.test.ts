import { expect, test } from '@jest/globals';
import { filledState, testErrorMessage } from './ingredients-test-data';
import ingredientsSlice from './ingredients-slice';
import { getIngredientsData } from './ingredients-thunks';

describe('ingredientsSlice', () => {
  const initialState = ingredientsSlice.getInitialState();

  test('should update the state when ingredients data is fetched successfully', () => {
    const action = {
      type: getIngredientsData.fulfilled.type,
      payload: filledState.ingredients
    };
    const updatedState = ingredientsSlice.reducer(initialState, action);

    expect(updatedState.ingredients).toEqual(filledState.ingredients);
    expect(updatedState.isLoading).toBe(false);
  });

  test('should set isLoading to true when ingredients data fetch is pending', () => {
    const action = { type: getIngredientsData.pending.type };
    const updatedState = ingredientsSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(true);
    expect(updatedState.error).toBe(null);
  });

  test('should update the error when ingredients data fetch is rejected', () => {
    const action = {
      type: getIngredientsData.rejected.type,
      error: { message: testErrorMessage }
    };
    const updatedState = ingredientsSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error?.message).toBe(testErrorMessage);
  });
});
