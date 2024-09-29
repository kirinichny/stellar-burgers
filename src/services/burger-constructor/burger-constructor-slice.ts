import {
  createSlice,
  nanoid,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { createOrderBurger } from './burger-constructor-thunks';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: SerializedError | null;
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = state.constructorItems.ingredients;
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= ingredients.length ||
        toIndex >= ingredients.length
      ) {
        return;
      }
      const [movedIngredient] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedIngredient);
    },
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createOrderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrderBurger.rejected, (state, action) => {
        state.error = action.error;
        state.orderRequest = false;
      })
      .addCase(createOrderBurger.fulfilled, (state, action) => {
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
        state.orderModalData = action.payload.order;
        state.error = null;
        state.orderRequest = false;
      });
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getError: (state) => state.error,
    getOrderRequest: (state) => state.orderRequest,
    getModalData: (state) => state.orderModalData
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  clearOrderModalData
} = burgerConstructorSlice.actions;

export const { getConstructorItems, getModalData, getOrderRequest, getError } =
  burgerConstructorSlice.selectors;
export default burgerConstructorSlice;
