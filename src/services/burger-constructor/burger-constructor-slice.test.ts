import {
  addIngredient,
  burgerConstructorSlice,
  deleteIngredient,
  moveIngredient
} from './burger-constructor-slice';

import { expect, test } from '@jest/globals';
import {
  bunIngredient,
  filledState,
  mainIngredient
} from './burger-constructor-test-data';

describe('burgerConstructorSlice', () => {
  const initialState = burgerConstructorSlice.getInitialState();

  test('should add a bun to the constructor', () => {
    const action = addIngredient(bunIngredient);
    const updatedState = burgerConstructorSlice.reducer(
      initialState,
      action
    );

    expect(updatedState.constructorItems.bun).toEqual(
      expect.objectContaining({
        _id: bunIngredient._id,
        name: bunIngredient.name,
        type: bunIngredient.type,
        proteins: bunIngredient.proteins,
        fat: bunIngredient.fat,
        carbohydrates: bunIngredient.carbohydrates,
        calories: bunIngredient.calories,
        price: bunIngredient.price,
        image: bunIngredient.image,
        image_mobile: bunIngredient.image_mobile,
        image_large: bunIngredient.image_large
      })
    );
  });

  test('should add a filling to the constructor', () => {
    const action = addIngredient(mainIngredient);
    const initialState = burgerConstructorSlice.getInitialState();
    const updatedState = burgerConstructorSlice.reducer(
      initialState,
      action
    );

    expect(updatedState.constructorItems.ingredients).toHaveLength(1);
    expect(updatedState.constructorItems.ingredients[0]).toEqual(
      expect.objectContaining({
        _id: mainIngredient._id,
        name: mainIngredient.name,
        type: mainIngredient.type,
        proteins: mainIngredient.proteins,
        fat: mainIngredient.fat,
        carbohydrates: mainIngredient.carbohydrates,
        calories: mainIngredient.calories,
        price: mainIngredient.price,
        image: mainIngredient.image,
        image_mobile: mainIngredient.image_mobile,
        image_large: mainIngredient.image_large
      })
    );
  });

  test('should delete an ingredient from the constructor', () => {
    const ingredientIdToDelete = filledState.constructorItems.ingredients[0].id;
    const action = deleteIngredient(ingredientIdToDelete);
    const updatedState = burgerConstructorSlice.reducer(
      filledState,
      action
    );

    expect(updatedState.constructorItems.ingredients).toHaveLength(1);
    expect(updatedState.constructorItems.ingredients[0].name).toBe(
      filledState.constructorItems.ingredients[1].name
    );
  });

  test('should move an ingredient within the constructor', () => {
    const action = moveIngredient({ fromIndex: 1, toIndex: 0 });
    const updatedState = burgerConstructorSlice.reducer(
      filledState,
      action
    );

    expect(updatedState.constructorItems.ingredients[0].name).toBe(
      filledState.constructorItems.ingredients[1].name
    );
    expect(updatedState.constructorItems.ingredients[1].name).toBe(
      filledState.constructorItems.ingredients[0].name
    );
  });
});
