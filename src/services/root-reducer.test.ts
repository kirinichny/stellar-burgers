import rootReducer from './root-reducer';

import authSlice from './auth/auth-slice';
import feedSlice from './feed/feed-slice';
import ordersSlice from './orders/orders-slice';
import burgerConstructorSlice from './burger-constructor/burger-constructor-slice';
import ingredientsSlice from './ingredients/ingredients-slice';

describe('rootReducer', () => {
  it('should initialize the state correctly', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    const expectedState = {
      [authSlice.name]: authSlice.getInitialState(),
      [feedSlice.name]: feedSlice.getInitialState(),
      [ordersSlice.name]: ordersSlice.getInitialState(),
      [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
      [ingredientsSlice.name]: ingredientsSlice.getInitialState()
    };

    expect(state).toEqual(expectedState);
  });
});
