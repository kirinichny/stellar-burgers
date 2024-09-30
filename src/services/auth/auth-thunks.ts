import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  updateUserApi
} from '@api';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { setIsAuthChecked } from './auth-slice';

const registerUser = createAsyncThunk('auth/register', registerUserApi);

const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: TLoginData) => {
    const response = await loginUserApi(loginData);

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

const checkUserAuth = createAsyncThunk(
  'auth/checkStatus',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      await dispatch(getUserData());
    }
    dispatch(setIsAuthChecked(true));
  }
);

const logoutUser = createAsyncThunk('auth/logout', () => {
  logoutApi().then(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });
});

const getUserData = createAsyncThunk('auth/getUser', getUserApi);

const updateUserData = createAsyncThunk('auth/updateUser', updateUserApi);

export {
  registerUser,
  loginUser,
  checkUserAuth,
  logoutUser,
  getUserData,
  updateUserData
};
