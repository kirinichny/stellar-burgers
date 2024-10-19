import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrdersData = createAsyncThunk('user/getOrders', getOrdersApi);
