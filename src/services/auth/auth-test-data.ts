import { TUser } from '@utils-types';

const testErrorMessage = 'Test error message';

const user: TUser = {
  email: 'fortest@mail.ru',
  name: 'Username'
};

const loggedInState = {
  user,
  isAuthChecked: false,
  isAuthenticated: true,
  isLoading: false,
  error: null
};

export { testErrorMessage, user, loggedInState };
