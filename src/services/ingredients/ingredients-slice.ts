import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsData } from './ingredients-thunks';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getIngredientsData.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getIngredientsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredientsData.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientById: (state) => state.ingredients,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  }
});

export const { getIngredients, getIsLoading, getError } =
  ingredientsSlice.selectors;
export default ingredientsSlice;
