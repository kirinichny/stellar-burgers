import { TOrdersState } from './orders-slice';

const testErrorMessage = 'Test error message';

const filledState: TOrdersState = {
  orders: [
    {
      _id: '671e7e79d829be001c779388',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-10-28T17:55:05.251Z',
      updatedAt: '2024-10-28T17:55:06.137Z',
      number: 100
    },
    {
      _id: '671dfb4ed829be001c77922a',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-10-27T08:35:26.535Z',
      updatedAt: '2024-10-27T08:35:27.520Z',
      number: 100
    }
  ],
  isLoading: false,
  error: null
};

export { testErrorMessage, filledState };
