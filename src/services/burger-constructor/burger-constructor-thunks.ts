import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrderBurger = createAsyncThunk(
  'order/create',
  orderBurgerApi
);
