import { expect, test } from '@jest/globals';
import authSlice from './auth-slice';
import {
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
  updateUserData
} from './auth-thunks';
import { loggedInState, testErrorMessage, user } from './auth-test-data';

describe('authSlice', () => {
  const initialState = authSlice.getInitialState();

  test('should update the state when user registration is successful', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user }
    };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.user).toEqual(user);
  });

  test('should set isLoading to true when user registration is pending', () => {
    const action = { type: registerUser.pending.type };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(true);
  });

  test('should update the error when user registration is rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: testErrorMessage }
    };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error?.message).toBe(testErrorMessage);
  });

  // Tests for loginUser
  test('should set isLoading to true when user login is pending', () => {
    const action = { type: loginUser.pending.type };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(true);
    expect(updatedState.error).toBe(null);
  });

  test('should update the error when user login is rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: testErrorMessage }
    };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error?.message).toBe(testErrorMessage);
    expect(updatedState.isAuthChecked).toBe(true);
  });

  test('should set user data when user login is fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: user
    };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.user).toEqual(user);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.isAuthenticated).toBe(true);
    expect(updatedState.isAuthChecked).toBe(true);
  });

  // Tests for logoutUser
  test('should set isLoading to true when user logout is pending', () => {
    const action = { type: logoutUser.pending.type };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(true);
  });

  test('should update the error when user logout is rejected', () => {
    const action = {
      type: logoutUser.rejected.type,
      error: { message: testErrorMessage }
    };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error?.message).toBe(testErrorMessage);
  });

  test('should reset user data when user logout is fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const updatedState = authSlice.reducer(loggedInState, action);

    expect(updatedState.isAuthChecked).toBe(true);
    expect(updatedState.isAuthenticated).toBe(false);
    expect(updatedState.user).toBe(null);
  });

  test('should set isLoading to true when getting user data is pending', () => {
    const action = { type: getUserData.pending.type };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(true);
  });

  test('should unset isAuthenticated when getting user data is rejected', () => {
    const action = { type: getUserData.rejected.type };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.isAuthenticated).toBe(false);
  });

  test('should set user data when getUserData is fulfilled', () => {
    const action = {
      type: getUserData.fulfilled.type,
      payload: { user }
    };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isAuthenticated).toBe(true);
    expect(updatedState.user).toEqual(user);
  });

  test('should set isLoading to true when updating user data is pending', () => {
    const action = { type: updateUserData.pending.type };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(true);
  });

  test('should unset isAuthenticated when updating user data is rejected', () => {
    const action = { type: updateUserData.rejected.type };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.isAuthenticated).toBe(false);
  });

  test('should update user data when updateUserData is fulfilled', () => {
    const action = {
      type: updateUserData.fulfilled.type,
      payload: { user }
    };
    const updatedState = authSlice.reducer(initialState, action);

    expect(updatedState.isAuthenticated).toBe(true);
    expect(updatedState.user).toEqual(user);
  });
});
