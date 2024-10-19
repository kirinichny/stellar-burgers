import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedData = createAsyncThunk('feed/get', getFeedsApi);
