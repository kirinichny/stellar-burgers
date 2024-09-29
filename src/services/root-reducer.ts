import { combineSlices } from '@reduxjs/toolkit';
import authSlice from './auth/auth-slice';
import feedSlice from './feed/feed-slice';
import ordersSlice from './orders/orders-slice';
import burgerConstructorSlice from './burger-constructor/burger-constructor-slice';
import ingredientsSlice from './ingredients/ingredients-slice';

const rootReducer = combineSlices(
  authSlice,
  feedSlice,
  ordersSlice,
  burgerConstructorSlice,
  ingredientsSlice
);

export default rootReducer;
